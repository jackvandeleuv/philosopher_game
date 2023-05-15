"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Philosopher = void 0;
const Move_1 = require("./Move");
class Philosopher {
    constructor(newName, newAttack, newDefense, newHealthPoints) {
        this.movePool = [];
        this.maxMoves = 5;
        this.retired = false;
        this.name = newName;
        this.attack = newAttack;
        this.defense = newDefense;
        this.healthPoints = newHealthPoints;
    }
    addMove(newMove) {
        if (this.movePool.length >= this.maxMoves) {
            return false;
        }
        let moveCopy = new Move_1.Move(newMove.getName(), newMove.getSchool(), newMove.getAccuracy(), newMove.getPower());
        this.movePool.push(moveCopy);
        return true;
    }
    getAttack() {
        return this.attack;
    }
    getName() {
        return this.name;
    }
    getDefense() {
        return this.defense;
    }
    getHealthPoints() {
        return this.healthPoints;
    }
    makeAttack(moveIndex) {
        let chosenMove = this.movePool[moveIndex];
        if (Math.random() > chosenMove.getAccuracy()) {
            return 0;
        }
        return this.attack * chosenMove.getPower();
    }
    /*
    Returns a boolean to indicate if the Philosopher retired as a result
    of the damage taken.
    */
    takeDamage(damage) {
        this.healthPoints = this.healthPoints - damage;
        this.retired = this.healthPoints <= 0;
        return this.retired;
    }
    isRetired() {
        return this.retired;
    }
    deepCopy() {
        return new Philosopher(this.name, this.attack, this.defense, this.healthPoints);
    }
    getMoves() {
        let moveNames = [];
        for (let move of this.movePool) {
            moveNames.push(move.getName());
        }
        return moveNames;
    }
}
exports.Philosopher = Philosopher;
