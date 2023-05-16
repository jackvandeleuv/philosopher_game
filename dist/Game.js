export class Game {
    constructor(newPlayer1, newPlayer2, newPhilGroup1, newPhilGroup2) {
        this.players = [];
        this.philGroups = [];
        this.activePhils = [];
        this.moving = 0;
        this.defending = 1;
        this.players.push(newPlayer1);
        this.players.push(newPlayer2);
        this.philGroups.push(newPhilGroup1);
        this.philGroups.push(newPhilGroup2);
        this.activePhils.push(newPhilGroup1[0]);
        this.activePhils.push(newPhilGroup2[1]);
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
