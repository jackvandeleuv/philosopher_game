import { GameScene, MenuState } from './GameState.js';
import { BattleMenu } from './menus/BattleMenu.js';
import { MoveMenu } from './menus/MoveMenu.js';
import { Game } from './Game.js';
import { SwitchMenu } from './menus/SwitchMenu.js';
import { DefaultScene } from './scenes/DefaultScene.js';
import { Philosopher } from './entities/Philosopher.js';
import { YourPhilEnters } from './scenes/YourPhilEnters.js';
import { YourPhilLeaves } from './scenes/YourPhilLeaves.js';
import { PhilSwaps } from './scenes/PhilSwaps.js';
import { ImageRepository } from './ImageRepository.js';
import { SwitchMenuNoBack } from './menus/SwitchMenuNoBack.js';
import { TheirPhilEnters } from './scenes/TheirPhilEnters.js';
import { TheirPhilLeaves } from './scenes/TheirPhilLeaves.js'
import { FrozenMenu } from './menus/FrozenMenu.js';

export enum MenuFlag {
    MainBattleMenu,
    MoveMenu,
    SwitchMenu,
    SwitchMenuNoBack,
    Resign,
    FrozenMenu
}

export enum GameSceneFlag {
    DefaultScene,
    YourPhilEnters,
    YourPhilLeaves,
    TheirPhilEnters,
    TheirPhilLeaves,
    YourPhilSwaps,
    TheirPhilSwaps
}

export class StateManager {
    private currentMenuState: MenuState;
    private gameSceneQueue: GameScene[] = [];

    constructor(private ctx: CanvasRenderingContext2D, private game: Game, private playerIndex: number, private imageRepo: ImageRepository) {
        this.currentMenuState = new BattleMenu(ctx);
        this.gameSceneQueue.push(this.generateGameScene(GameSceneFlag.DefaultScene));
        this.currentMenuState.activate();
        }

    pushGameScene(scene: GameSceneFlag) {
        this.gameSceneQueue.push(this.generateGameScene(scene));
    }

    generateGameScene(flag: GameSceneFlag): GameScene {
        let activePhils = this.game.getActivePhils();
        switch (flag) {
            case GameSceneFlag.DefaultScene:
                return new DefaultScene(this.ctx, activePhils[this.playerIndex], activePhils[this.playerIndex ^ 1], this.imageRepo);
                break;
            case GameSceneFlag.YourPhilEnters:
                return new YourPhilEnters(this.ctx, activePhils[this.playerIndex], activePhils[this.playerIndex ^ 1], this.imageRepo);
                break;
            case GameSceneFlag.YourPhilLeaves:
                return new YourPhilLeaves(this.ctx, activePhils[this.playerIndex], activePhils[this.playerIndex ^ 1], this.imageRepo)
                break;
            case GameSceneFlag.YourPhilSwaps:
                let yourLeavingPhil = this.game.getLeavingPhil();
                if (yourLeavingPhil != null) {
                    return new PhilSwaps(
                        new YourPhilLeaves(this.ctx, yourLeavingPhil, activePhils[this.playerIndex ^ 1], this.imageRepo),
                        new YourPhilEnters(this.ctx, activePhils[this.playerIndex], activePhils[this.playerIndex ^ 1], this.imageRepo)
                    );
                } else {
                    throw new Error('Flagged YourPhilSwaps but game did not have a leaving phil to display');
                }
                break;
            case GameSceneFlag.TheirPhilEnters:
                return new TheirPhilEnters(this.ctx, activePhils[this.playerIndex], activePhils[this.playerIndex ^ 1], this.imageRepo);
                break;
            case GameSceneFlag.TheirPhilLeaves:
                return new TheirPhilLeaves(this.ctx, activePhils[this.playerIndex], activePhils[this.playerIndex ^ 1], this.imageRepo)
                break;
            case GameSceneFlag.TheirPhilSwaps:
                let theirLeavingPhil = this.game.getLeavingPhil();
                if (theirLeavingPhil != null) {
                    return new PhilSwaps(
                        new TheirPhilLeaves(this.ctx, activePhils[this.playerIndex], theirLeavingPhil, this.imageRepo),
                        new TheirPhilEnters(this.ctx, activePhils[this.playerIndex], activePhils[this.playerIndex ^ 1], this.imageRepo)
                    );
                } else {
                    throw new Error('Flagged TheirPhilSwaps but game does not have a leaving phil to display');
                }
                break;
            default:
                throw new Error('Unknown GameSceneFlag sent to generateGameScene');    
        }
    }

    render(): void {
        if (this.currentMenuState instanceof MoveMenu) {
            this.currentMenuState.updateMoves(this.game.getActivePhils()[this.playerIndex].getMoves());
        } 

        this.currentMenuState.render();

        // If there are scenes waiting, remove the first completed one
        if (this.gameSceneQueue.length > 1) {
            // Clear any completed scenes from the head of the queue
            while (this.gameSceneQueue.length > 1 && this.gameSceneQueue[0].isSceneComplete()) {
                this.gameSceneQueue.shift();
            }
        } 

        // If the only scene in queue is complete and non-default, replace it with default
        if (this.gameSceneQueue.length == 1
            && !(this.gameSceneQueue[0] instanceof DefaultScene) 
            && this.gameSceneQueue[0].isSceneComplete()) {
            this.gameSceneQueue[0] = this.generateGameScene(GameSceneFlag.DefaultScene);
        }

        // If the queue is empty, insert a default scene
        if (this.gameSceneQueue.length == 0) {
            this.gameSceneQueue[0] = this.generateGameScene(GameSceneFlag.DefaultScene);
        }

        this.gameSceneQueue[0].render();

        let gameMessage = this.game.getGameMessage();
        if (gameMessage != null) {
            if (!gameMessage.isReadBy(this.playerIndex)) {
                console.log(gameMessage.getMessage());
                gameMessage.setMessageRead(this.playerIndex);
            }
        }
    }

    /*
    Uses MenuState enum to switch the active menu object.
    */
    changeMenuState(state: MenuFlag) {
        switch(state) {
            case MenuFlag.MainBattleMenu:
                this.currentMenuState.deactivate();
                this.currentMenuState = new BattleMenu(this.ctx);
                this.currentMenuState.activate();
                break;
            case MenuFlag.MoveMenu:
                this.currentMenuState.deactivate();
                this.currentMenuState = new MoveMenu(this.ctx);
                this.currentMenuState.activate();
                break; 
            case MenuFlag.SwitchMenu:
                this.currentMenuState.deactivate();
                this.currentMenuState = new SwitchMenu(this.ctx, this.game, this.playerIndex);
                this.currentMenuState.activate();
                break;
            case MenuFlag.SwitchMenuNoBack:
                this.currentMenuState.deactivate();
                this.currentMenuState = new SwitchMenuNoBack(this.ctx, this.game, this.playerIndex);
                this.currentMenuState.activate();                
                break;
            case MenuFlag.Resign:
                console.log('Player ' 
                                + (this.game.getTurnToMove() + 1).toString() 
                                + ' resigned!\nPlayer '
                                + ((this.game.getTurnToMove() ^ 1) + 1).toString()
                                + ' wins!'
                                );
                this.currentMenuState.deactivate();
                break;
            case MenuFlag.FrozenMenu:
                this.currentMenuState.deactivate();
                this.currentMenuState = new FrozenMenu(this.ctx);
                this.currentMenuState.activate();
                break;
            default:
                throw new Error('Menu state ' + state + ' not as expected.');
        }
    }

    getGameSceneQueueLength(): number {
        return this.gameSceneQueue.length;
    }
    
    processMenuInput(): void {
        if (this.currentMenuState instanceof MoveMenu) {
            this.processMoveMenuInput();
        } 

        // Switch menu state if applicable
        let newState = this.currentMenuState.getNextMenuState();
        if (newState != null) {
            this.changeMenuState(newState);
        } 
    }

    private processMoveMenuInput(): void {
        if (this.currentMenuState instanceof MoveMenu) {
            // Make new move if applicable
            let newMove = this.currentMenuState.getNextMove();
            if (newMove != null) {
                this.game.makeMove(newMove.deepCopy(), this.playerIndex)
            }
        } else {
            throw new Error('Process move menu input called when current menu not Move Menu')
        }
    }

}