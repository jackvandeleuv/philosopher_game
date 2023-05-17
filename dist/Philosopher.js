import { Move } from './Move.js';
export class Philosopher {
    constructor(name, attack, defense, health) {
        this.moves = [];
        this.maxMoves = 5;
        this.retired = false;
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.health = health;
    }
    getMove(moveIndex) {
        return this.moves[moveIndex].deepCopy();
    }
    getMoves() {
        let moveCopies = [];
        for (let i = 0; i < this.moves.length; i++) {
            moveCopies[i] = this.moves[i].deepCopy();
        }
        return moveCopies;
    }
    addMove(move) {
        if (this.moves.length >= this.maxMoves) {
            return false;
        }
        let moveCopy = new Move(move.toString(), move.getSchool(), move.getAccuracy(), move.getPower());
        this.moves.push(moveCopy);
        return true;
    }
    getAttack() {
        return this.attack;
    }
    toString() {
        return this.name;
    }
    getDefense() {
        return this.defense;
    }
    getHealth() {
        return this.health;
    }
    makeAttack(moveIndex) {
        let chosenMove = this.moves[moveIndex];
        if (Math.random() > chosenMove.getAccuracy()) {
            return 0;
        }
        return this.attack * chosenMove.getPower();
    }
    isRetired() {
        return this.retired;
    }
    deepCopy() {
        let philCopy = new Philosopher(this.name, this.attack, this.defense, this.health);
        for (let move of this.moves) {
            philCopy.addMove(move);
        }
        return philCopy;
    }
    takeDamage(damage) {
        this.health = this.health - damage;
        this.retired = this.health <= 0;
    }
    getMoveNames() {
        let moveNames = [];
        for (let move of this.moves) {
            moveNames.push(move.toString());
        }
        return moveNames;
    }
}
