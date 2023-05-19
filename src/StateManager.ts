import { GameScene, MenuState } from './GameState.js';
import { BattleMenu } from './menus/BattleMenu.js';
import { MoveMenu } from './menus/MoveMenu.js';
import { Game } from './Game.js';
import { SwitchMenu } from './menus/SwitchMenu.js';
import { SwitchMenuNoBack } from './menus/SwitchMenuNoBack.js';

export enum MenuType {
    MainBattleMenu,
    MoveMenu,
    SwitchMenu,
    Resign
}

export class StateManager {
    private currentMenuState: MenuState;
    private gameSceneQueue: GameScene[] = [];
    private mainBattleMenu: BattleMenu;
    private moveMenu: MoveMenu;
    private switchMenu: SwitchMenu;

    constructor(ctx: CanvasRenderingContext2D, private game: Game) {
        this.moveMenu = new MoveMenu(ctx);
        this.mainBattleMenu = new BattleMenu(ctx);
        this.switchMenu = new SwitchMenu(ctx, this.game);
        this.currentMenuState = this.mainBattleMenu;
        this.currentMenuState.activate();
        }

    start(): void {
        this.gameLoop();
    }

    private gameLoop(): void {
        const gameLoopStep = () => {
            // Process input from menus
            this.processInput();
            
            // Get input from the game logic
            let nextScene = this.game.getNextScene();
            if (nextScene != null) {
                this.gameSceneQueue.push(nextScene);
            }
            let nextState = this.game.getNextMenuState();
            if (nextState != null) {
                this.currentMenuState.deactivate();
                this.currentMenuState = nextState;
                this.currentMenuState.activate();
            }

            // Check for queued scenes
            if (this.gameSceneQueue.length > 0 && this.gameSceneQueue[0].isSceneComplete()) {
                this.gameSceneQueue.pop();
            }

            // Render current state
            this.render();

            requestAnimationFrame(gameLoopStep);
        }

        requestAnimationFrame(gameLoopStep);
    }

    private render(): void {
        if (this.currentMenuState instanceof MoveMenu) {
            this.moveMenu.updateMoves(this.game.getPhilToMove().getMoves());
        } 

        this.currentMenuState.render();

        if (this.gameSceneQueue.length > 0) {
            this.gameSceneQueue[0].render();
        } else {
            this.game.getDefaultScene().render();
        }
    }

    /*
    Uses MenuState enum to switch the active menu object.
    */
    private changeMenuState(state: MenuType) {
        this.game.battleUpdate()
        switch(state) {
            case MenuType.MainBattleMenu:
                this.currentMenuState.deactivate();
                this.currentMenuState = this.mainBattleMenu;
                this.currentMenuState.activate();
                break;
            case MenuType.MoveMenu:
                this.currentMenuState.deactivate();
                this.currentMenuState = this.moveMenu;
                this.currentMenuState.activate();
                break; 
            case MenuType.SwitchMenu:
                this.currentMenuState.deactivate();
                this.currentMenuState = this.switchMenu;
                this.currentMenuState.activate();
                break;
            default:
                throw new Error("Menu state not as expected.");
        }
    }
    
    private processInput(): void {
        if (this.currentMenuState instanceof MoveMenu) {
            this.processMoveMenuInput();
        } 
        
        if (this.currentMenuState instanceof SwitchMenu) {
            this.processSwitchMenuInput(this.currentMenuState);
        } 

        // Switch menu state if applicable
        let newState = this.currentMenuState.getNextMenuState();
        if (newState != null) {
            this.changeMenuState(newState);
        } 
    }

    private processMoveMenuInput(): void {
        // Make new move if applicable
        let newMove = this.moveMenu.getNextMove();
        if (newMove != null) {
            this.game.makeMove(newMove.deepCopy())
        }
    }

    private processSwitchMenuInput(switchMenu: SwitchMenu): void {
        // Add game scene to queue if applicable
        let newScene = switchMenu.getNextGameScene();
        if (newScene != null) {
            this.gameSceneQueue.push(newScene);
        }
    }
}