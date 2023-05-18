import { Move } from './Move.js';
export class Philosopher {
    constructor(name, attack, defense, health, imagePath, retired) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.health = health;
        this.imagePath = imagePath;
        this.retired = retired;
        this.moves = [];
        this.maxMoves = 5;
        this.loadedImage = null;
    }
    getMove(moveIndex) {
        return this.moves[moveIndex].deepCopy();
    }
    setLoadedImage(image) {
        this.loadedImage = image;
    }
    getLoadedImage() {
        return this.loadedImage;
    }
    getImagePath() {
        return this.imagePath;
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
    isRetired() {
        return this.retired;
    }
    deepCopy() {
        let philCopy = new Philosopher(this.name, this.attack, this.defense, this.health, this.imagePath, this.retired);
        if (this.loadedImage != null) {
            philCopy.setLoadedImage(this.loadedImage);
        }
        for (let move of this.moves) {
            philCopy.addMove(move);
        }
        return philCopy;
    }
    takeDamage(damage) {
        this.health = this.health - damage;
        this.retired = this.health <= 0;
    }
}
