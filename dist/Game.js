import { MenuFlag } from './StateManager.js';
import { GameSceneFlag } from './StateManager.js';
export class Game {
    constructor(player1, player2, philGroup1, philGroup2) {
        this.players = [];
        this.philGroups = [];
        this.activePhils = [];
        this.leavingPhil = null;
        this.moving = 0;
        this.defending = 1;
        this.nextGameScene1 = null;
        this.nextGameScene2 = null;
        this.nextMenuState1 = null;
        this.nextMenuState2 = null;
        this.players.push(player1.deepCopy());
        this.players.push(player2.deepCopy());
        // Defensive copy
        let philGroup1Copy = [];
        for (let i = 0; i < philGroup1.length; i++) {
            philGroup1Copy[i] = philGroup1[i].deepCopy();
        }
        // Defensive copy
        let philGroup2Copy = [];
        for (let i = 0; i < philGroup2.length; i++) {
            philGroup2Copy[i] = philGroup2[i].deepCopy();
        }
        this.philGroups.push(philGroup1Copy);
        this.philGroups.push(philGroup2Copy);
        this.activePhils[0] = 0;
        this.activePhils[1] = 0;
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
    nextTurn() {
        this.moving = this.moving ^ 1;
        this.defending = this.defending ^ 1;
    }
    replaceRetiredPhil(newActivePhil, player) {
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
    getLeavingPhil() {
        if (this.leavingPhil != null) {
            return this.leavingPhil.deepCopy();
        }
        return null;
    }
    getActivePhilIndex(playerIndex) {
        return this.activePhils[playerIndex];
    }
    swapActivePhil(newActivePhil, playerIndex) {
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
    getNextMenuState1() {
        let nextState = this.nextMenuState1;
        this.nextMenuState1 = null;
        return nextState;
    }
    getNextMenuState2() {
        let nextState = this.nextMenuState2;
        this.nextMenuState2 = null;
        return nextState;
    }
    /*
    Player number is 0 for player 1 and 1 for player 2.
    */
    getTurnToMove() {
        return this.moving;
    }
    /*
    Player number should be 0 for player 1 and 1 for player 2.
    */
    setActivePhil(newActivePhil, playerNumber) {
        this.activePhils[playerNumber] = newActivePhil;
    }
    getActivePhils() {
        let copyActivePhils = [];
        copyActivePhils[0] = this.philGroups[0][this.activePhils[0]].deepCopy();
        copyActivePhils[1] = this.philGroups[1][this.activePhils[1]].deepCopy();
        return copyActivePhils;
    }
    getNextScene1() {
        let nextScene = this.nextGameScene1;
        this.nextGameScene1 = null;
        return nextScene;
    }
    getNextScene2() {
        let nextScene = this.nextGameScene2;
        this.nextGameScene2 = null;
        return nextScene;
    }
    getPhils() {
        let philGroupCopy = [];
        for (let i = 0; i < this.philGroups.length; i++) {
            let philGroupSubCopy = [];
            for (let j = 0; j < this.philGroups[i].length; j++) {
                philGroupSubCopy[j] = this.philGroups[i][j].deepCopy();
            }
            philGroupCopy[i] = philGroupSubCopy;
        }
        return philGroupCopy;
    }
    makeMove(chosenMove, playerIndex) {
        let philGroupToMove = this.philGroups[playerIndex];
        let philGroupToDefend = this.philGroups[playerIndex ^ 1];
        let philToMove = philGroupToMove[this.activePhils[playerIndex]];
        let philToDefend = philGroupToDefend[this.activePhils[playerIndex]];
        this.printBattleStatus();
        console.log(philToMove
            + ' used '
            + chosenMove
            + '!\n');
        let damageOut = philToMove.getAttack() * chosenMove.getPower();
        let damageDealt = damageOut * philToDefend.getDefense();
        if (damageDealt == 0) {
            console.log(chosenMove
                + ' missed the mark and did no damage!');
        }
        if (damageDealt > 0) {
            console.log(chosenMove + ' did ' + damageDealt + ' damage!\n');
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
    printBattleStatus() {
        console.log('\nPlayer ' + (this.moving + 1).toString() + "'s turn:\n");
        let movingPhil = this.philGroups[this.moving][this.activePhils[this.moving]];
        let defendingPhil = this.philGroups[this.moving][this.activePhils[this.defending]];
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
    printBattleUpdate() {
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
        console.log('Defending: ' + this.defending);
    }
    defenderGroupRetired() {
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
