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
        let promptString = 'What should Player '
            + (this.moving + 1).toString()
            + "'s "
            + philToMove
            + ' do?\n';
        for (let i = 0; i < moves.length; i++) {
            promptString = promptString
                + (i + 1).toString()
                + ') '
                + moves[i]
                + '\n';
        }
        let chosenMoveIndex = parseInt(prompt(promptString)) - 1;
        let chosenMoveName = philToMove.getMoveNames()[chosenMoveIndex];
        console.log(philToMove
            + ' used '
            + chosenMoveName
            + '!\n');
        let damageDealt = philToMove.makeAttack(chosenMoveIndex);
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
            + movingPhil.getHealthPoints().toString()
            + '\n');
        console.log('Opposing '
            + defendingPhil
            + "'s health - "
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
