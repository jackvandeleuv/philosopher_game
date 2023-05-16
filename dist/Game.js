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
    chooseNewDefender(retiredPhilName) {
        let defendingGroup = this.philGroups[this.defending];
        let promptString = retiredPhilName + ' retired! Pick a new Philosopher:\n';
        for (let i = 0; i < defendingGroup.length; i++) {
            if (!defendingGroup[i].isRetired()) {
                promptString = promptString + (i + 1).toString() + ') ' + defendingGroup[i].getName() + '\n';
            }
        }
        let chosenPhilIndex = parseInt(prompt(promptString));
        return defendingGroup[chosenPhilIndex];
    }
    /*
    Returns an integer indicating the winner.
    */
    start() {
    }
    printTeamStatus() {
        console.log('Player ' + (this.moving + 1).toString() + "'s turn:\n");
        let movingPhil = this.activePhils[this.moving].getHealthPoints();
        let defendingPhil = this.activePhils[this.defending].getHealthPoints();
    }
    moveSelect() {
        let philToMove = this.activePhils[this.moving];
        let philToDefend = this.activePhils[this.defending];
        let moves = philToMove.getMoveNames();
        let promptString = 'Player ' + (this.moving + 1).toString() + "'s turn:\n";
        for (let i = 0; i < moves.length; i++) {
            promptString = promptString + (i + 1).toString() + ') ' + moves[i] + '\n';
        }
        let chosenMove = parseInt(prompt(promptString));
        let damageDealt = philToMove.makeAttack(chosenMove);
        let defenderRetired = philToDefend.takeDamage(damageDealt);
        if (defenderRetired) {
            this.activePhils[this.defending] = this.chooseNewDefender(philToDefend.getName());
        }
        this.moving = this.moving ^ 1;
        this.defending = this.defending ^ 1;
    }
}
