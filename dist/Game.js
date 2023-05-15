"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
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
    moveSelect() {
        let philToMove = this.activePhils[this.moving];
        let philToDefend = this.activePhils[this.defending];
        let moves = philToMove.getMoves();
        let promptString = 'Player ' + (this.moving + 1).toString() + "'s turn:\n";
        for (let i = 0; i < moves.length; i++) {
            promptString = promptString + (i + 1).toString() + ') ' + moves[i] + '\n';
        }
        let chosenMove = parseInt(prompt(promptString));
        this.doBattle(philToMove, philToDefend, chosenMove - 1);
    }
    doBattle(philToMove, philToDefend, chosenIndex) {
    }
}
exports.Game = Game;
