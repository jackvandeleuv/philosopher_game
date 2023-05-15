import { Move } from './Move';

export class Philosopher {
    private name: string;
    private attack: number;
    private defense: number;
    private healthPoints: number;
    private movePool: Move[] = [];
    private maxMoves: number = 5;

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

    takeDamage(damage: number): void {
        this.healthPoints = this.healthPoints - damage;
        if (this.healthPoints <= 0) {
            this.retire();
        }
    }

    private retire(): void { console.log(this.name + ' retired!'); }
}