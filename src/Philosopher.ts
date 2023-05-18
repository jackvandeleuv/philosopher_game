import { Move } from './Move.js';

export class Philosopher {
    private moves: Move[] = [];
    private maxMoves: number = 5;
    private retired: boolean = false;

    constructor(
        private name: string,
        private attack: number,
        private defense: number,
        private health: number,
        private imagePath: string
      ) {}

    getMove(moveIndex: number): Move {
        return this.moves[moveIndex].deepCopy();
    }

    setImage(imagePath: string) {
        this.imagePath = imagePath;
    }

    getImage(): string {
        return this.imagePath;
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
}