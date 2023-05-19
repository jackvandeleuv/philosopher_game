import { GameScene, MenuState } from './GameState.js';
import { BattleMenu } from './menus/BattleMenu.js';
import { MoveMenu } from './menus/MoveMenu.js';
import { GameLogic } from './GameLogic.js';
import { SwitchMenu } from './menus/SwitchMenu.js';
import { YourPhilEnters } from './scenes/YourPhilEnters.js';

export enum MenuType {
    MainBattleMenu,
    MoveMenu,
    SwitchMenu,
    Resign
}

export class StateManager {
    private currentMenuState: MenuState;
    private currentGameScene: GameScene;
    private mainBattleMenu: BattleMenu;
    private moveMenu: MoveMenu;
    private switchMenu: SwitchMenu

    constructor(private ctx: CanvasRenderingContext2D, private game: GameLogic) {
        this.moveMenu = new MoveMenu(ctx);
        this.mainBattleMenu = new BattleMenu(ctx);
        this.switchMenu = new SwitchMenu(ctx);
        this.currentMenuState = this.mainBattleMenu;
        this.currentMenuState.activate();

        this.currentGameScene = this.game.getNextScene();
        }

        
    start(): void {
        this.gameLoop();
    }

    private gameLoop(): void {
        const gameLoopStep = () => {
            this.processInput();
            if (this.currentGameScene.isSceneComplete()) {
                this.currentGameScene = this.game.getNextScene();
            }
            this.render();
            requestAnimationFrame(gameLoopStep);
        }

        requestAnimationFrame(gameLoopStep);
    }

    private render(): void {
        if (this.currentMenuState instanceof BattleMenu) {
            this.mainBattleMenu.render();
        } else if (this.currentMenuState instanceof MoveMenu) {
            this.moveMenu.updateMoves(this.game.getPhilToMove().getMoves());
            this.moveMenu.render();
        } else if (this.currentMenuState instanceof SwitchMenu) {
            this.switchMenu.updatePhils(this.game.getPhils()[0]);
            this.switchMenu.render();
        } else {
            throw new Error('Menus were not as expected.');
        }
        this.currentGameScene.render();
    }

    /*
    Uses MenuState enum to switch the active menu object.
    */
    private changeMenuState(state: MenuType) {
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
        if (this.currentMenuState instanceof BattleMenu) {
            this.processBattleMenuInput();
        } else if (this.currentMenuState instanceof MoveMenu) {
            this.processMoveMenuInput();
        } else if (this.currentMenuState instanceof SwitchMenu) {
            this.processSwitchMenuInput();
        } else {
            throw new Error("Menu state not as expected.");
        }
    }

    private processBattleMenuInput(): void {
        // Switch menu state if applicable
        let newState = this.mainBattleMenu.getNextState();
        if (newState != null) {
            this.changeMenuState(newState);
        }
    }

    private processMoveMenuInput(): void {
        // Switch menu state if applicable
        let newState = this.moveMenu.getNextState();
        if (newState != null) {
            this.changeMenuState(newState);
        } 

        // Make new move if applicable
        let newMove = this.moveMenu.getNextMove();
        if (newMove != null) {
            this.game.makeMove(newMove.deepCopy())
        }
    }

    private processSwitchMenuInput(): void {
        // Switch menu state if applicable
        let newState = this.switchMenu.getNextState();
        if (newState != null) {
            this.changeMenuState(newState);
        } 

        // Make new move if applicable
        let newPhil = this.switchMenu.getNextPhil();
        if (newPhil != null) {
            this.game.setActivePhil(newPhil.deepCopy(), this.game.getTurnToMove());
            this.game.nextTurn();
            console.log('You switched Philosophers, forfeiting your turn!');
            this.currentGameScene = new YourPhilEnters(this.ctx, newPhil, this.game.getPhilToMove());
        }
    }
}