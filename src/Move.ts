import { School } from './School';

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

    getName(): string {
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