import { Move } from './entities/Move.js';
import { School } from './entities/School.js';
import { Philosopher } from './entities/Philosopher.js';
import { Player } from './entities/Player.js';
import { MenuFlag } from './StateManager.js';
import { GameSceneFlag } from './StateManager.js';

export class Game {
    private players: Player[] = [];
    private philGroups: Philosopher[][] = [];
    private activePhils: Philosopher[] = [];
    private moving = 0;
    private defending = 1;
    private nextGameScene1: GameSceneFlag | null = null;
    private nextGameScene2: GameSceneFlag | null = null;
    private nextMenuState1: MenuFlag | null = null;
    private nextMenuState2: MenuFlag | null = null;

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
    private nextTurn(): void {
        this.moving = this.moving ^ 1;
        this.defending = this.defending ^ 1;
    }

    replaceRetiredPhil(newActivePhil: Philosopher, player: number): void {
        if (!newActivePhil.isRetired()) {
            this.activePhils[player] = newActivePhil.deepCopy();
            if (player == 0) {
                this.nextGameScene1 = GameSceneFlag.YourPhilEnters;
                this.nextGameScene2 = GameSceneFlag.TheirPhilEnters;
            }
            if (player == 1) {
                this.nextGameScene1 = GameSceneFlag.TheirPhilEnters;
                this.nextGameScene2 = GameSceneFlag.YourPhilEnters;
            }
            console.log('Player ' 
                            + (player + 1).toString() 
                            + ' sent out ' 
                            + newActivePhil 
                            + 'to go argue!');
        } 
    }

    swapActivePhil(newActivePhil: Philosopher, player: number): void {
        if (!newActivePhil.isRetired()) {
            this.activePhils[player] = newActivePhil.deepCopy();
            if (player == 0) {
                this.nextGameScene1 = GameSceneFlag.YourPhilSwaps;
                this.nextGameScene2 = GameSceneFlag.TheirPhilSwaps;
            }
            if (player == 1) {
                this.nextGameScene1 = GameSceneFlag.TheirPhilEnters;
                this.nextGameScene2 = GameSceneFlag.YourPhilEnters;
            }
            console.log('Player ' 
                            + (player + 1).toString() 
                            + ' switched Philosophers to ' 
                            + newActivePhil 
                            + ', forfeiting their turn!');
            this.nextTurn();
        } 
        
        else {
            throw new Error('Called swap active phil to try and swap in a retired phil!');
        }
    }

    getNextMenuState1(): MenuFlag | null {
        let nextState = this.nextMenuState1;
        this.nextMenuState1 = null;
        return nextState;
    }

    getNextMenuState2(): MenuFlag | null {
        let nextState = this.nextMenuState2;
        this.nextMenuState2 = null;
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
    private setActivePhil(newActivePhil: Philosopher, playerNumber: number): void {
        this.activePhils[playerNumber] = newActivePhil.deepCopy();
    }

    getActivePhils(): Philosopher[] {
        let copyActivePhils: Philosopher[] = []
        for (let phil of this.activePhils) {
            copyActivePhils.push(phil.deepCopy());
        }
        return copyActivePhils;
    }

    getNextScene1(): GameSceneFlag | null {
        let nextScene = this.nextGameScene1;
        this.nextGameScene1 = null;
        return nextScene;
    }

    getNextScene2(): GameSceneFlag | null {
        let nextScene = this.nextGameScene2;
        this.nextGameScene2 = null;
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
            this.nextMenuState1 = MenuFlag.SwitchMenuNoBack;
            this.nextMenuState2 = MenuFlag.SwitchMenuNoBack;
            return;
        }

        if (philToDefend.isRetired()) {
            if (this.moving == 1) { 
                this.nextMenuState1 = MenuFlag.SwitchMenuNoBack; 
                this.nextGameScene1 = GameSceneFlag.YourPhilLeaves;
                this.nextGameScene2 = GameSceneFlag.TheirPhilLeaves;
            }
            if (this.moving == 0) { 
                this.nextMenuState2 = MenuFlag.SwitchMenuNoBack;
                this.nextGameScene1 = GameSceneFlag.TheirPhilLeaves;
                this.nextGameScene2 = GameSceneFlag.YourPhilLeaves; 
            }
        } 
        
        this.nextTurn();
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