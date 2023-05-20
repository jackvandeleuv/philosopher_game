import { Move } from './entities/Move.js';
import { School } from './entities/School.js';
import { Philosopher } from './entities/Philosopher.js';
import { Player } from './entities/Player.js';
import { GameScene, MenuState } from './GameState.js';
import { YourPhilLeaves } from './scenes/YourPhilLeaves.js';
import { DefaultScene } from './scenes/DefaultScene.js';
import { SwitchMenu } from './menus/SwitchMenu.js';
import { SwitchMenuNoBack } from './menus/SwitchMenuNoBack.js';
import { MenuFlag } from './StateManager.js';
import { GameSceneFlag } from './StateManager.js';

export class Game {
    private players: Player[] = [];
    private philGroups: Philosopher[][] = [];
    private activePhils: Philosopher[] = [];
    private moving = 0;
    private defending = 1;
    private nextGameScene: GameSceneFlag | null = null;
    private nextMenuState: MenuFlag | null = null;

    constructor(player1: Player, player2: Player, philGroup1: Philosopher[], philGroup2: Philosopher[]) {
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
    } 

    // deepCopy(): Game {
    //     // Defensive copy
    //     let philGroup1Copy: Philosopher[] = []
    //     for (let i = 0; i < this.philGroups[0].length; i++) {
    //         philGroup1Copy[i] = this.philGroups[0][i].deepCopy();
    //     }

    //     // Defensive copy
    //     let philGroup2Copy: Philosopher[] = []
    //     for (let i = 0; i < this.philGroups[1].length; i++) {
    //         philGroup2Copy[i] = this.philGroups[1][i].deepCopy();
    //     }

    //     let gameCopy = new Game(this.players[0].deepCopy(), 
    //                             this.players[1].deepCopy(), 
    //                             philGroup1Copy,
    //                             philGroup2Copy,
    //                             this.ctx)

    //     for (let i = 0; i < this.activePhils.length; i++) {
    //         gameCopy.activePhils[i] = this.activePhils[i].deepCopy();
    //     }

    //     gameCopy.moving = this.moving;
    //     gameCopy.defending = this.defending;
    //     gameCopy.nextGameScene = this.nextGameScene;
    //     gameCopy.nextMenuState = this.nextMenuState;

    //     return gameCopy;
    // }

    /*
    Flips turn to move between the two players.
    */
    nextTurn(): void {
        this.moving = this.moving ^ 1;
        this.defending = this.defending ^ 1;
    }

    getNextMenuState(): MenuFlag | null {
        let nextState = this.nextMenuState;
        this.nextMenuState = null;
        return nextState;
    }

    /*
    Player number is 0 for player 1 and 1 for player 2.
    */
    getTurnToMove(): number {
        return this.moving;
    }

    /*
    Player number should be 0 for player 1 and 1 for player 2.
    */
    setActivePhil(newActivePhil: Philosopher, playerNumber: number): void {
        this.activePhils[playerNumber] = newActivePhil.deepCopy();
    }

    getActivePhils(): Philosopher[] {
        let copyActivePhils: Philosopher[] = []
        for (let phil of this.activePhils) {
            copyActivePhils.push(phil.deepCopy());
        }
        return copyActivePhils;
    }

    getNextScene(): GameSceneFlag | null {
        let nextScene = this.nextGameScene;
        this.nextGameScene = null;
        return nextScene;
    }

    getPhils(): Philosopher[][] {
        let philGroupCopy: Philosopher[][] = []
        for (let i = 0; i < this.philGroups.length; i++) {
            let philGroupSubCopy: Philosopher[] = [];
            for (let j = 0; j < this.philGroups[i].length; j++) {
                philGroupSubCopy[j] = this.philGroups[i][j].deepCopy();
            }
            philGroupCopy[i] = philGroupSubCopy;
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

        if (this.defenderGroupRetired()) {
            console.log('Player ' 
                            + (this.moving + 1).toString() 
                            + ' won!');
            this.nextMenuState = MenuFlag.SwitchMenuNoBack;
            return;
        }

        if (philToDefend.isRetired()) {
            this.nextGameScene = GameSceneFlag.YourPhilLeaves;
            this.nextMenuState = MenuFlag.SwitchMenuNoBack;
        } else {
            this.nextTurn();
        }
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

    printBattleUpdate(): void {
        console.log('\nactivePhils: ' + this.activePhils);
        let philStr = '';
        for (let philGroup of this.getPhils()) {
            for (let phil of philGroup) {
                philStr = philStr + phil.toString();
                philStr = philStr + ' ' + phil.isRetired() + '\n';
            }
        }
        console.log('all Phils: ' + philStr);
        console.log('Moving: ' + this.moving);
        console.log('Defending: ' + this.defending)
        // console.log('Next MenuState: ' + this.getNextMenuState())
        // console.log('Next GameScene: ' + this.getNextScene() + '\n')
        console.log('Retirement statuses: ' + this.activePhils[0].isRetired() + ', ' + this.activePhils[1].isRetired())
    }

    private defenderGroupRetired(): boolean {
        // Check to see if all Philosophers on one team are retired.
        for (let i = 0; i < this.philGroups[this.defending].length; i++) {
            for (let phil of this.philGroups[this.defending]) {
                if (!phil.isRetired()) {
                    return false;
                }
            }
        }
        return true;
    }

}