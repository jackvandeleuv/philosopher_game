import { Move } from './Move';

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

    getName(): string {
        return this.name;
    }

    getDefense(): number {
        return this.defense;
    }

    getHealthPoints(): number {
        return this.healthPoints;
    }

    takeDamage(damage: number): void {
        this.healthPoints = this.healthPoints - damage;
        if (this.healthPoints <= 0) {
            this.retire();
        }
    }

    isRetired(): boolean {
        return this.retired;
    }

    deepCopy(): Philosopher {
        return new Philosopher(this.name, this.attack, this.defense, this.healthPoints);
    }

    private retire(): void { 
        this.retired = true;
    }
}