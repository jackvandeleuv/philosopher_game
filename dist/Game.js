export class Game {
    constructor(newPlayer1, newPlayer2, newPhilGroup1, newPhilGroup2) {
        this.players = [];
        this.philGroups = [];
        this.activePhils = [];
        this.moving = 0;
        this.defending = 1;
        this.players.push(newPlayer1.deepCopy());
        this.players.push(newPlayer2.deepCopy());
        // Defensive copy
        let newPhilGroup1Copy = [];
        for (let i = 0; i < newPhilGroup1.length; i++) {
            newPhilGroup1Copy[i] = newPhilGroup1[i].deepCopy();
        }
        // Defensive copy
        let newPhilGroup2Copy = [];
        for (let i = 0; i < newPhilGroup2.length; i++) {
            newPhilGroup2Copy[i] = newPhilGroup2[i].deepCopy();
        }
        this.philGroups.push(newPhilGroup1Copy);
        this.philGroups.push(newPhilGroup2Copy);
        this.activePhils.push(newPhilGroup1Copy[0]);
        this.activePhils.push(newPhilGroup2Copy[0]);
    }
    /*
    Returns an integer indicating the winner.
    */
    start() {
        while (true) {
            this.moveSelect();
            let winner = this.allRetired();
            if (winner != -1) {
                return winner;
            }
        }
    }
    moveSelect() {
        let philToMove = this.activePhils[this.moving];
        let philToDefend = this.activePhils[this.defending];
        this.printBattleStatus();
        let moves = philToMove.getMoveNames();
        let promptString = '';
        for (let i = 0; i < moves.length; i++) {
            promptString = promptString + (i + 1).toString() + ') ' + moves[i] + '\n';
        }
        let chosenMove = parseInt(prompt(promptString));
        console.log(philToMove.getName()
            + ' used '
            + philToMove.getMoveNames()[chosenMove].toString()
            + '!\n');
        let damageDealt = philToMove.makeAttack(chosenMove - 1);
        let defenderRetired = philToDefend.takeDamage(damageDealt);
        if (defenderRetired) {
            this.activePhils[this.defending] = this.chooseNewDefender(philToDefend.getName());
            console.log('Your turn, ' + this.activePhils[this.defending] + '!\n');
        }
        this.moving = this.moving ^ 1;
        this.defending = this.defending ^ 1;
    }
    chooseNewDefender(retiredPhilName) {
        let defendingGroup = this.philGroups[this.defending];
        console.log(retiredPhilName + ' retired! Pick a new Philosopher:\n');
        let promptString = '';
        for (let i = 0; i < defendingGroup.length; i++) {
            if (!defendingGroup[i].isRetired()) {
                promptString = promptString
                    + (i + 1).toString()
                    + ') '
                    + defendingGroup[i].getName()
                    + '\n';
            }
        }
        let chosenPhil = parseInt(prompt(promptString));
        return defendingGroup[chosenPhil - 1];
    }
    printBattleStatus() {
        console.log('Player ' + (this.moving + 1).toString() + "'s turn:\n");
        let movingPhil = this.activePhils[this.moving];
        let defendingPhil = this.activePhils[this.defending];
        console.log(movingPhil.getName() + ' is ready to move.\n');
        console.log('Health - ' + movingPhil.getHealthPoints().toString() + '\n');
        console.log('The opposing '
            + defendingPhil.getName()
            + ' has '
            + defendingPhil.getHealthPoints()
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
                console.log('Player ' + (i + 1).toString() + "'s team retired! Game over!");
                return i ^ 1;
            }
        }
        return -1;
    }
}
