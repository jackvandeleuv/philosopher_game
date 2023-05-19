import { BattleMenu } from './menus/BattleMenu.js';
import { MoveMenu } from './menus/MoveMenu.js';
import { SwitchMenu } from './menus/SwitchMenu.js';
export var MenuType;
(function (MenuType) {
    MenuType[MenuType["MainBattleMenu"] = 0] = "MainBattleMenu";
    MenuType[MenuType["MoveMenu"] = 1] = "MoveMenu";
    MenuType[MenuType["SwitchMenu"] = 2] = "SwitchMenu";
    MenuType[MenuType["Resign"] = 3] = "Resign";
})(MenuType || (MenuType = {}));
export class StateManager {
    constructor(ctx, game) {
        this.game = game;
        this.gameSceneQueue = [];
        this.moveMenu = new MoveMenu(ctx);
        this.mainBattleMenu = new BattleMenu(ctx);
        this.switchMenu = new SwitchMenu(ctx, this.game.deepCopy());
        this.currentMenuState = this.mainBattleMenu;
        this.currentMenuState.activate();
    }
    start() {
        this.gameLoop();
    }
    gameLoop() {
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
        };
        requestAnimationFrame(gameLoopStep);
    }
    render() {
        if (this.currentMenuState instanceof MoveMenu) {
            this.moveMenu.updateMoves(this.game.getPhilToMove().getMoves());
        }
        if (this.currentMenuState instanceof SwitchMenu) {
            this.switchMenu.updateGameCopy(this.game.deepCopy());
        }
        this.currentMenuState.render();
        if (this.gameSceneQueue.length > 0) {
            this.gameSceneQueue[0].render();
        }
        else {
            this.game.getDefaultScene().render();
        }
    }
    /*
    Uses MenuState enum to switch the active menu object.
    */
    changeMenuState(state) {
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
            case MenuType.SwitchMenu:
                this.currentMenuState.deactivate();
                this.currentMenuState = this.switchMenu;
                this.currentMenuState.activate();
                break;
            default:
                throw new Error("Menu state not as expected.");
        }
    }
    processInput() {
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
    processMoveMenuInput() {
        // Make new move if applicable
        let newMove = this.moveMenu.getNextMove();
        if (newMove != null) {
            this.game.makeMove(newMove.deepCopy());
        }
    }
    processSwitchMenuInput(switchMenu) {
        // Add game scene to queue if applicable
        let newScene = switchMenu.getNextGameScene();
        if (newScene != null) {
            this.gameSceneQueue.push(newScene);
        }
        // Make new move if applicable
        let newPhil = switchMenu.getNextPhil();
        if (newPhil != null) {
            this.game.setActivePhil(newPhil.deepCopy(), this.game.getTurnToMove());
            this.game.nextTurn();
        }
    }
}
