import { School } from './School.js';

export class Move {
    private name: string;
    private school: School;
    private accuracy: number;
    private power: number;

    constructor(name: string, school: School, accuracy: number, power: number) {
        this.name = name;
        this.school = school;
        this.accuracy = accuracy;
        this.power = power;
    }

    deepCopy() {
        return new Move(this.name, this.school, this.accuracy, this.power);
    }

    toString(): string {
        return this.name;
    }

    getSchool(): School {
        return this.school;
    }

    getAccuracy(): number {
        return this.accuracy;
    }

    getPower(): number {
        return this.power;
    }


}