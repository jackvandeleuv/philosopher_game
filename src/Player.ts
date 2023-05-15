import { Move } from './Move';
import { School } from './School';
import { Philosopher } from './Philosopher';

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