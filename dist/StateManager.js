import { BattleMenu } from './menus/BattleMenu.js';
import { MoveMenu } from './menus/MoveMenu.js';
import { EnterPhil } from './scenes/EnterPhil.js';
export var MenuType;
(function (MenuType) {
    MenuType[MenuType["MainBattleMenu"] = 0] = "MainBattleMenu";
    MenuType[MenuType["MoveMenu"] = 1] = "MoveMenu";
    MenuType[MenuType["SwitchMenu"] = 2] = "SwitchMenu";
    MenuType[MenuType["Resign"] = 3] = "Resign";
})(MenuType || (MenuType = {}));
export class StateManager {
    constructor(ctx, game) {
        this.ctx = ctx;
        this.game = game;
        this.moveMenu = new MoveMenu(ctx);
        this.mainBattleMenu = new BattleMenu(ctx);
        this.currentMenuState = this.mainBattleMenu;
        this.currentMenuState.activate();
        this.currentGameState = new EnterPhil(this.ctx, this.game.getPhilToMove(), 75, 100, 125, 125);
        // this.render();
        this.currentGameState = new EnterPhil(this.ctx, this.game.getPhilToDefend(), 200, 50, 50, 50);
    }
    start() {
        this.gameLoop();
    }
    gameLoop() {
        const gameLoopStep = () => {
            this.processInput();
            this.render();
            requestAnimationFrame(gameLoopStep);
        };
        requestAnimationFrame(gameLoopStep);
    }
    render() {
        if (this.currentMenuState instanceof BattleMenu) {
            this.mainBattleMenu.render();
        }
        else if (this.currentMenuState instanceof MoveMenu) {
            this.moveMenu.updateMoves(this.game.getPhilToMove().getMoves());
            this.moveMenu.render();
        }
        else {
            throw new Error('Menus were not as expected.');
        }
        this.currentGameState.render();
    }
    /*
    Uses MenuState enum to switch the active menu object.
    */
    switchMenuState(state) {
        switch (state) {
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
    processInput() {
        if (this.currentMenuState instanceof BattleMenu) {
            this.processBattleMenuInput();
        }
        else if (this.currentMenuState instanceof MoveMenu) {
            this.processMoveMenuInput();
        }
        else {
            throw new Error("Menu state not as expected.");
        }
    }
    processBattleMenuInput() {
        // Switch menu state if applicable
        let newStateMain = this.mainBattleMenu.getNextState();
        if (newStateMain != null) {
            this.switchMenuState(newStateMain);
        }
    }
    processMoveMenuInput() {
        // Switch menu state if applicable
        let newStateMove = this.moveMenu.getNextState();
        if (newStateMove != null) {
            this.switchMenuState(newStateMove);
        }
        // Make new move if applicable
        let newMove = this.moveMenu.getNextMove();
        if (newMove != null) {
            this.game.makeMove(newMove.deepCopy());
            this.game.oppMove();
        }
    }
}
