"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Philosopher = void 0;
const Move_1 = require("./Move");
class Philosopher {
    constructor(newName, newAttack, newDefense, newHealthPoints) {
        this.movePool = [];
        this.maxMoves = 5;
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
    takeDamage(damage) {
        this.healthPoints = this.healthPoints - damage;
        if (this.healthPoints <= 0) {
            this.retire();
        }
    }
    retire() { console.log(this.name + ' retired!'); }
}
exports.Philosopher = Philosopher;
