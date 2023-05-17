import { Move } from './Move.js';

export class Philosopher {
    private name: string;
    private attack: number;
    private defense: number;
    private health: number;
    private moves: Move[] = [];
    private maxMoves: number = 5;
    private retired: boolean = false;

    constructor(name: string, attack: number, defense: number, health: number) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.health = health;
    }

    getMove(moveIndex: number): Move {
        return this.moves[moveIndex].deepCopy();
    }

    getMoves(): Move[] {
        let moveCopies: Move[] = [];
        for (let i = 0; i < this.moves.length; i++) {
            moveCopies[i] = this.moves[i].deepCopy();
        }
        return moveCopies;
    }

    addMove(move: Move): boolean {
        if (this.moves.length >= this.maxMoves) {
            return false;
        }

        let moveCopy = new Move(move.toString(), 
                                move.getSchool(), 
                                move.getAccuracy(), 
                                move.getPower()
                                );
        this.moves.push(moveCopy);
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

    getHealth(): number {
        return this.health;
    }

    makeAttack(moveIndex: number): number {
        let chosenMove = this.moves[moveIndex];
        if (Math.random() > chosenMove.getAccuracy()) {
            return 0;
        }

        return this.attack * chosenMove.getPower();
    }

    isRetired(): boolean {
        return this.retired;
    }

    deepCopy(): Philosopher {
        let philCopy: Philosopher = new Philosopher(this.name, 
                                                    this.attack, 
                                                    this.defense, 
                                                    this.health);
        for (let move of this.moves) {
            philCopy.addMove(move);
        }

        return philCopy;
    }

    takeDamage(damage: number): void {
        this.health = this.health - damage;
        this.retired = this.health <= 0;
    }

    getMoveNames(): string[] {
        let moveNames: string[] = []
        for (let move of this.moves) {
            moveNames.push(move.toString());
        } 
        return moveNames;
    }
}