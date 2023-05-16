import { Move } from './Move.js';
import { School } from './School.js';
import { Philosopher } from './Philosopher.js';

export class Player {
    private name: string;
    private activePhil: number = 0;
    
    constructor(newName: string) {
        this.name = newName;
    };

    getActivePhil(): number {
        return this.activePhil;
    }

    setActivePhil(activePhil: number): void {
        this.activePhil = activePhil;
    }

    getName(): string {
        return this.name;
    }
}