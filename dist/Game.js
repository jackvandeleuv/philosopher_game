import { MainBattleMenu } from './MainBattleMenu.js';
export var MenuState;
(function (MenuState) {
    MenuState[MenuState["MainBattleMenu"] = 0] = "MainBattleMenu";
    MenuState[MenuState["MoveMenu"] = 1] = "MoveMenu";
})(MenuState || (MenuState = {}));
export class Game {
    constructor(player1, player2, philGroup1, philGroup2, ctx) {
        this.players = [];
        this.philGroups = [];
        this.activePhils = [];
        this.moving = 0;
        this.defending = 1;
        this.players.push(player1.deepCopy());
        this.players.push(player2.deepCopy());
        // Defensive copy
        let philGroup1Copy = [];
        for (let i = 0; i < philGroup1.length; i++) {
            philGroup1Copy[i] = philGroup1[i].deepCopy();
        }
        // Defensive copy
        let philGroup2Copy = [];
        for (let i = 0; i < philGroup2.length; i++) {
            philGroup2Copy[i] = philGroup2[i].deepCopy();
        }
        this.philGroups.push(philGroup1Copy);
        this.philGroups.push(philGroup2Copy);
        this.activePhils.push(philGroup1Copy[0]);
        this.activePhils.push(philGroup2Copy[0]);
        this.currentState = new MainBattleMenu(ctx);
        this.ctx = ctx;
    }
    switchState(state) {
        this.currentState = state;
    }
    handleInput(event) {
        this.currentState.handleClick(this.ctx);
    }
    update() {
        this.currentState.update();
    }
    render(ctx) {
        this.currentState.render(ctx);
    }
    /*
    Returns an integer indicating the winner.
    */
    gameLoop() {
        while (true) {
            this.moveSelect();
            let winner = this.allRetired();
            if (winner != -1) {
                console.log('Player ' + winner + " won! Game over!");
                return winner;
            }
        }
    }
    moveSelect() {
        let philToMove = this.activePhils[this.moving];
        let philToDefend = this.activePhils[this.defending];
        this.printBattleStatus();
        this.currentState = new MainBattleMenu(this.ctx);
        this.currentState.
            console.log(philToMove
            + ' used '
            + chosenMoveName
            + '!\n');
        let damageOut = philToMove.makeAttack(chosenMoveIndex);
        let damageDealt = damageOut * philToDefend.getDefense();
        if (damageDealt == 0) {
            console.log(chosenMoveName
                + ' missed the mark and did no damage!');
        }
        if (damageDealt > 0) {
            console.log(chosenMoveName + ' did ' + damageDealt + ' damage!\n');
        }
        philToDefend.takeDamage(damageDealt);
        if (philToDefend.isRetired()) {
            console.log(philToDefend + ' retired! Pick a new Philosopher:\n');
            while (philToDefend.isRetired()) {
                if (this.allRetired() != -1) {
                    return;
                }
                ;
                philToDefend = this.chooseNewDefender();
                if (philToDefend.isRetired()) {
                    console.log('That Philosopher retired already! Pick a different one.\n');
                }
            }
            this.activePhils[this.defending] = philToDefend;
            console.log('Your turn, ' + philToDefend + '!\n');
        }
        this.moving = this.moving ^ 1;
        this.defending = this.defending ^ 1;
    }
    chooseNewDefender() {
        let defendingGroup = this.philGroups[this.defending];
        let promptString = '';
        for (let i = 0; i < defendingGroup.length; i++) {
            if (!defendingGroup[i].isRetired()) {
                promptString = promptString
                    + (i + 1).toString()
                    + ') '
                    + defendingGroup[i]
                    + '\n';
            }
            if (defendingGroup[i].isRetired()) {
                promptString = promptString
                    + (i + 1).toString()
                    + ') '
                    + defendingGroup[i]
                    + ' (retired)\n';
            }
        }
        let chosenPhil = parseInt(prompt(promptString)) - 1;
        return defendingGroup[chosenPhil];
    }
    printBattleStatus() {
        console.log('\nPlayer ' + (this.moving + 1).toString() + "'s turn:\n");
        let movingPhil = this.activePhils[this.moving];
        let defendingPhil = this.activePhils[this.defending];
        console.log(movingPhil + ' is ready to move.\n');
        console.log('Your '
            + movingPhil
            + "'s Health - "
            + movingPhil.getHealth().toString()
            + '\n');
        console.log('Opposing '
            + defendingPhil
            + "'s health - "
            + defendingPhil.getHealth()
            + '\n');
    }
    allRetired() {
        // Check to see if all Philosophers on one team are retired.
        for (let i = 0; i < this.philGroups.length; i++) {
            let teamRetired = true;
            for (let phil of this.philGroups[i]) {
                if (!phil.isRetired()) {
                    teamRetired = !teamRetired;
                    break;
                }
            }
            if (teamRetired) {
                return i ^ 1;
            }
        }
        return -1;
    }
}
