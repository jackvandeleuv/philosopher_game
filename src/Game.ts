import { Move } from './Move.js';
import { School } from './School.js';
import { Philosopher } from './Philosopher.js';
import { Player } from './Player.js';

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

    chooseNewDefender(retiredPhilName: string): Philosopher {
        let defendingGroup: Philosopher[] = this.philGroups[this.defending];
        let promptString: string = retiredPhilName + ' retired! Pick a new Philosopher:\n';
        for (let i = 0; i < defendingGroup.length; i++) {
            if (!defendingGroup[i].isRetired()) {
                promptString = promptString + (i + 1).toString() + ') ' + defendingGroup[i].getName() + '\n';
            }
        }
        let chosenPhilIndex: number = parseInt(prompt(promptString) as string) as number;
        return defendingGroup[chosenPhilIndex];
    }

    private moveSelect(): void {
        let philToMove: Philosopher = this.activePhils[this.moving];
        let philToDefend: Philosopher = this.activePhils[this.defending];

        let moves: string[] = philToMove.getMoveNames();
        let promptString: string = 'Player ' + (this.moving + 1).toString() + "'s turn:\n";

        for (let i = 0; i < moves.length; i++) {
            promptString = promptString + (i + 1).toString() + ') ' + moves[i] + '\n'
        }

        let chosenMove: number = parseInt(prompt(promptString) as string) as number;
        
        let damageDealt: number = philToMove.makeAttack(chosenMove);
        let defenderRetired: boolean = philToDefend.takeDamage(damageDealt);  
        
        if (defenderRetired) {
            this.activePhils[this.defending] = this.chooseNewDefender(philToDefend.getName());
        }

        this.moving = this.moving ^ 1;
        this.defending = this.defending ^ 1;
    }

}