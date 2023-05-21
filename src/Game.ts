import { Move } from './entities/Move.js';
import { School } from './entities/School.js';
import { Philosopher } from './entities/Philosopher.js';
import { Player } from './entities/Player.js';
import { MenuFlag } from './StateManager.js';
import { GameSceneFlag } from './StateManager.js';

export class Game {
    private players: Player[] = [];
    private philGroups: Philosopher[][] = [];
    private activePhils: number[] = [];
    private leavingPhil: Philosopher | null = null;
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

        this.activePhils[0] = 0;
        this.activePhils[1] = 0;
    } 

    /*
    Flips turn to move between the two players.
    */
    private nextTurn(): void {
        this.moving = this.moving ^ 1;
        this.defending = this.defending ^ 1;
    }

    replaceRetiredPhil(newActivePhil: Philosopher, player: number): void {
        if (!newActivePhil.isRetired()) {
            let philGroup = this.philGroups[player];
            philGroup[this.activePhils[player]] = newActivePhil.deepCopy();
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

    getLeavingPhil(): Philosopher | null {
        if (this.leavingPhil != null) { 
            return this.leavingPhil.deepCopy() 
        }
        return null;
    }

    getActivePhilIndex(playerIndex: number): number {
        return this.activePhils[playerIndex];
    }

    swapActivePhil(newActivePhil: Philosopher, playerIndex: number): void {
        if (!newActivePhil.isRetired()) {
            let philGroup = this.philGroups[playerIndex];
            this.leavingPhil = philGroup[this.activePhils[playerIndex]];
            philGroup[this.activePhils[playerIndex]] = newActivePhil.deepCopy();
            if (playerIndex == 0) {
                this.nextGameScene1 = GameSceneFlag.YourPhilSwaps;
                this.nextGameScene2 = GameSceneFlag.TheirPhilSwaps;
            }
            if (playerIndex == 1) {
                this.nextGameScene1 = GameSceneFlag.TheirPhilSwaps;
                this.nextGameScene2 = GameSceneFlag.YourPhilSwaps;
            }

            if (playerIndex == 0) { 
                this.nextMenuState1 = MenuFlag.FrozenMenu;
                this.nextMenuState2 = MenuFlag.MainBattleMenu;
            }
            if (playerIndex == 1) { 
                this.nextMenuState1 = MenuFlag.MainBattleMenu;
                this.nextMenuState2 = MenuFlag.FrozenMenu;
            }
    
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
    private setActivePhil(newActivePhil: number, playerNumber: number): void {
        this.activePhils[playerNumber] = newActivePhil;
    }

    getActivePhils(): Philosopher[] {
        let copyActivePhils: Philosopher[] = []
        copyActivePhils[0] = this.philGroups[0][this.activePhils[0]].deepCopy();
        copyActivePhils[1] = this.philGroups[1][this.activePhils[1]].deepCopy();
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

    makeMove(chosenMove: Move, playerIndex: number) {
        let philGroupToMove = this.philGroups[playerIndex];
        let philGroupToDefend = this.philGroups[playerIndex ^ 1];
        let philToMove: Philosopher = philGroupToMove[this.activePhils[playerIndex]];
        let philToDefend: Philosopher = philGroupToDefend[this.activePhils[playerIndex]];

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

        if (playerIndex == 0) { 
            this.nextMenuState1 = MenuFlag.FrozenMenu;
            this.nextMenuState2 = MenuFlag.MainBattleMenu;
        }
        if (playerIndex == 1) { 
            this.nextMenuState1 = MenuFlag.MainBattleMenu;
            this.nextMenuState2 = MenuFlag.FrozenMenu;
        }

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

        let movingPhil: Philosopher = this.philGroups[this.moving][this.activePhils[this.moving]];
        let defendingPhil: Philosopher = this.philGroups[this.moving][this.activePhils[this.defending]];

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