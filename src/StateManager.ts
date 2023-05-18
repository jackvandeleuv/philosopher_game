import { Move } from './Move.js';
import { School } from './School.js';
import { Philosopher } from './Philosopher.js';
import { Player } from './Player.js';
import { GameScene, MenuState } from './GameState.js';
import { BattleMenu } from './BattleMenu.js';
import { MoveMenu } from './MoveMenu.js';
import { EnterPhil } from './EnterPhil.js';
import { GameLogic } from './GameLogic.js';

export enum MenuType {
    MainBattleMenu,
    MoveMenu,
    SwitchMenu,
    Resign
}

export class StateManager {
    private currentMenuState: MenuState;
    private currentGameState: GameScene;
    private mainBattleMenu: BattleMenu;
    private moveMenu: MoveMenu;

    constructor(private ctx: CanvasRenderingContext2D, private game: GameLogic) {
        this.game.loadPhilIcons();

        this.moveMenu = new MoveMenu(ctx);
        this.mainBattleMenu = new BattleMenu(ctx);
        this.currentMenuState = this.mainBattleMenu;
        this.currentMenuState.activate();
        
        this.currentGameState = new EnterPhil(this.ctx, this.game.getPhilToMove(), 50, 50, 50, 50);
        // this.render();
        // this.currentGameState = new EnterPhil(this.ctx, this.game.getPhilToDefend(), 200, 50, 50, 50);
        }

        
    start(): void {
        this.gameLoop();
    }

    private gameLoop(): void {
        const gameLoopStep = () => {
            this.processInput();
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
        } else {
            throw new Error('Menus were not as expected.');
        }
        this.currentGameState.render();
    }

    /*
    Uses MenuState enum to switch the active menu object.
    */
    private switchMenuState(state: MenuType) {
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
            default:
                throw new Error("Menu state not as expected.");
        }
    }
    
    private processInput(): void {
        if (this.currentMenuState instanceof BattleMenu) {
            this.processBattleMenuInput();
        } else if (this.currentMenuState instanceof MoveMenu) {
            this.processMoveMenuInput();
        } else {
            throw new Error("Menu state not as expected.");
        }
    }

    private processBattleMenuInput(): void {
        // Switch menu state if applicable
        let newStateMain = this.mainBattleMenu.getNextState();
        if (newStateMain != null) {
            this.switchMenuState(newStateMain);
        }
    }

    private processMoveMenuInput(): void {
        // Switch menu state if applicable
        let newStateMove = this.moveMenu.getNextState();
        if (newStateMove != null) {
            this.switchMenuState(newStateMove);
        } 

        // Make new move if applicable
        let newMove = this.moveMenu.getNextMove();
        if (newMove != null) {
            this.game.makeMove(newMove.deepCopy())
            this.game.oppMove();
        }
    }
}