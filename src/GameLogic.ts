import { Move } from './entities/Move.js';
import { School } from './entities/School.js';
import { Philosopher } from './entities/Philosopher.js';
import { Player } from './entities/Player.js';
import { GameScene } from './GameState.js';
import { YourPhilLeaves } from './scenes/YourPhilLeaves.js';
import { BattleMenu } from './menus/BattleMenu.js';
import { BattleStart } from './scenes/BattleStart.js';
import { YourPhilEnters } from './scenes/YourPhilEnters.js';

export class GameLogic {
    private players: Player[] = [];
    private philGroups: Philosopher[][] = [];
    private activePhils: Philosopher[] = [];
    private moving = 0;
    private defending = 1;
    private nextScene: GameScene;

    constructor(player1: Player, player2: Player, philGroup1: Philosopher[], philGroup2: Philosopher[], private ctx: CanvasRenderingContext2D) {
        this.players.push(player1.deepCopy());
        this.players.push(player2.deepCopy());

        // Defensive copy
        let philGroup1Copy: Philosopher[] = []
        for (let i = 0; i < philGroup1.length; i++) {
            philGroup1Copy[i] = philGroup1[i].deepCopy();
        }

        // Defensive copy
        let philGroup2Copy: Philosopher[] = []
        for (let i = 0; i < philGroup2.length; i++) {
            philGroup2Copy[i] = philGroup2[i].deepCopy();
        }

        this.philGroups.push(philGroup1Copy);
        this.philGroups.push(philGroup2Copy);

        this.activePhils.push(philGroup1Copy[0]);
        this.activePhils.push(philGroup2Copy[0]);

        this.nextScene = new BattleStart(this.ctx, this.activePhils[0], this.activePhils[1]);
    } 

    getNextScene(): GameScene {
        return this.nextScene;
    }

    oppMove(): void {
        let moves = this.activePhils[this.moving].getMoves();
        let choice = Math.floor(Math.random() * moves.length);
        this.makeMove(moves[choice]);
    }

    getPhils(): Philosopher[][] {
        let philGroupCopy: Philosopher[][] = []
        for (let i = 0; i < this.philGroups.length; i++) {
            for (let j = 0; j < this.philGroups[i].length; j++) {
                philGroupCopy[i][j] = this.philGroups[i][j].deepCopy();
            }
        }
        return philGroupCopy;
    }

    getPhilToMove(): Philosopher {
        return this.activePhils[this.moving].deepCopy();
    }

    getPhilToDefend(): Philosopher {
        return this.activePhils[this.defending].deepCopy();
    }

    makeMove(chosenMove: Move) {
        let philToMove: Philosopher = this.activePhils[this.moving];
        let philToDefend: Philosopher = this.activePhils[this.defending];

        this.printBattleStatus();

        console.log(philToMove 
                    + ' used ' 
                    + chosenMove
                    + '!\n');
        
        let damageOut: number = philToMove.getAttack() * chosenMove.getPower();
        let damageDealt: number = damageOut * philToDefend.getDefense();

        if (damageDealt == 0) {
            console.log(chosenMove 
                            + ' missed the mark and did no damage!');
        } 

        if (damageDealt > 0) {
            console.log(chosenMove + ' did ' + damageDealt + ' damage!\n')
        }

        philToDefend.takeDamage(damageDealt);  
        
        if (philToDefend.isRetired()) {
            this.pickNewPhil();
        }

        this.moving = this.moving ^ 1;
        this.defending = this.defending ^ 1;
    }

    private pickNewPhil(): void {
        let opposingPhil = this.activePhils[this.moving];
        let philToReplace = this.activePhils[this.defending];

        if (this.moving == 1) {
            this.nextScene = new YourPhilLeaves(this.ctx, philToReplace.deepCopy(), opposingPhil.deepCopy());
            console.log(philToReplace + ' retired! Pick a new Philosopher:\n');

            while (philToReplace.isRetired()) {
                if (this.allRetired() != -1) { return };
                philToReplace = this.chooseNewDefender();
                if (philToReplace.isRetired()) {
                    console.log('That Philosopher retired already! Pick a different one.\n')
                }
            }
            this.activePhils[this.defending] = philToReplace;
            console.log('Your turn, ' + philToReplace + '!\n');
            this.nextScene = new YourPhilEnters(this.ctx, philToReplace.deepCopy(), opposingPhil);
        } 
        
        else {
            for (let phil of this.philGroups[this.defending]) {
                if (!phil.isRetired()) {
                    this.activePhils[this.defending] = phil;
                    return;
                }
            }
        }
    }

    chooseNewDefender(): Philosopher {
        let defendingGroup: Philosopher[] = this.philGroups[this.defending];

        let promptString: string = ''; 
        for (let i = 0; i < defendingGroup.length; i++) {
            if (!defendingGroup[i].isRetired()) {
                promptString = promptString 
                                + (i + 1).toString() 
                                + ') ' 
                                + defendingGroup[i] 
                                + '\n';
            }

            if (defendingGroup[i].isRetired()) {
                promptString = promptString
                                + (i + 1).toString()
                                + ') '
                                + defendingGroup[i]
                                + ' (retired)\n'
            }
        }

        let chosenPhil: number = parseInt(prompt(promptString) as string) - 1;
        return defendingGroup[chosenPhil];
    }

    private printBattleStatus(): void {
        console.log('\nPlayer ' + (this.moving + 1).toString() + "'s turn:\n");

        let movingPhil: Philosopher = this.activePhils[this.moving];
        let defendingPhil: Philosopher = this.activePhils[this.defending];

        console.log(movingPhil + ' is ready to move.\n');
        console.log('Your '
                        + movingPhil 
                        + "'s Health - " 
                        + movingPhil.getHealth().toString() 
                        + '\n');
        console.log('Opposing ' 
                        + defendingPhil 
                        + "'s health - " 
                        + defendingPhil.getHealth()
                        + '\n');
    }

    private allRetired(): number {
        // Check to see if all Philosophers on one team are retired.
        for (let i = 0; i < this.philGroups.length; i++) {

            let teamRetired: boolean = true;

            for (let phil of this.philGroups[i]) {
                if (!phil.isRetired()) {
                    teamRetired = !teamRetired;
                    break;
                }
            }

            if (teamRetired) {
                return i ^ 1;
            }
            
        }

        return -1;
    }

}