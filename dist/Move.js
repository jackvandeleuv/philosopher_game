"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Move = void 0;
class Move {
    constructor(name, school, accuracy, power) {
        this.name = name;
        this.school = school;
        this.accuracy = accuracy;
        this.power = power;
    }
    getName() {
        return this.name;
    }
    getSchool() {
        return this.school;
    }
    getAccuracy() {
        return this.accuracy;
    }
    getPower() {
        return this.power;
    }
}
exports.Move = Move;
