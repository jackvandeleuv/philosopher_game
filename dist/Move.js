export class Move {
    constructor(name, school, accuracy, power) {
        this.name = name;
        this.school = school;
        this.accuracy = accuracy;
        this.power = power;
    }
    deepCopy() {
        return new Move(this.name, this.school, this.accuracy, this.power);
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
