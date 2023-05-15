import { Move } from './Move';
import { School } from './School';
import { Philosopher } from './Philosopher';
import { Player } from './Player';

export class Game {
    private players: Player[] = [];
    private philGroups: Philosopher[][] = [];
    private activePhils: Philosopher[] = [];
    private moving: number = 0;
    private defending: number = 1;

    constructor(newPlayer1: Player, newPlayer2: Player, newPhilGroup1: Philosopher[], newPhilGroup2: Philosopher[]) {
        this.players.push(newPlayer1);
        this.players.push(newPlayer2);
        this.philGroups.push(newPhilGroup1);
        this.philGroups.push(newPhilGroup2);

        this.activePhils.push(newPhilGroup1[0])
        this.activePhils.push(newPhilGroup2[1]);
    }

    private moveSelect(): void {
        let philToMove: Philosopher = this.activePhils[this.moving];
        let philToDefend: Philosopher = this.activePhils[this.defending];

        let moves: string[] = philToMove.getMoves();
        let promptString: string = 'Player ' + (this.moving + 1).toString() + "'s turn:\n";

        for (let i = 0; i < moves.length; i++) {
            promptString = promptString + (i + 1).toString() + ') ' + moves[i] + '\n'
        }

        let chosenMove: number = parseInt(prompt(promptString) as string) as number;
        
        this.doBattle(philToMove, philToDefend, chosenMove - 1);

    }

    private doBattle(philToMove: Philosopher, philToDefend: Philosopher, chosenIndex: number): void {
        
    }

}