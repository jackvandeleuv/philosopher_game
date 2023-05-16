import { Move } from './Move.js';

export class Philosopher {
    private name: string;
    private attack: number;
    private defense: number;
    private healthPoints: number;
    private movePool: Move[] = [];
    private maxMoves: number = 5;
    private retired: boolean = false;

    constructor(newName: string, newAttack: number, newDefense: number, newHealthPoints: number) {
        this.name = newName;
        this.attack = newAttack;
        this.defense = newDefense;
        this.healthPoints = newHealthPoints;
    }

    getMove(moveIndex: number) {
        return this.movePool[moveIndex].deepCopy();
    }

    addMove(newMove: Move): boolean {
        if (this.movePool.length >= this.maxMoves) {
            return false;
        }

        let moveCopy = new Move(newMove.getName(), 
                                newMove.getSchool(), 
                                newMove.getAccuracy(), 
                                newMove.getPower()
                                );
        this.movePool.push(moveCopy);
        return true;
    }

    getAttack(): number {
        return this.attack;
    }

    toString(): string {
        return this.name;
    }

    getDefense(): number {
        return this.defense;
    }

    getHealthPoints(): number {
        return this.healthPoints;
    }

    makeAttack(moveIndex: number): number {
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
    takeDamage(damage: number): boolean {
        this.healthPoints = this.healthPoints - damage;
        this.retired = this.healthPoints <= 0;
        return this.retired;
    }

    isRetired(): boolean {
        return this.retired;
    }

    deepCopy(): Philosopher {
        let philCopy: Philosopher = new Philosopher(this.name, 
                                                    this.attack, 
                                                    this.defense, 
                                                    this.healthPoints);
        for (let move of this.movePool) {
            philCopy.addMove(move);
        }

        return philCopy;
    }

    getMoveNames(): string[] {
        let moveNames: string[] = []
        for (let move of this.movePool) {
            moveNames.push(move.getName());
        } 
        return moveNames;
    }
}