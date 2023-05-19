import { BattleMenu } from './menus/BattleMenu.js';
import { MoveMenu } from './menus/MoveMenu.js';
import { SwitchMenu } from './menus/SwitchMenu.js';
import { YourPhilEnters } from './scenes/YourPhilEnters.js';
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
        this.switchMenu = new SwitchMenu(ctx);
        this.currentMenuState = this.mainBattleMenu;
        this.currentMenuState.activate();
        this.currentGameScene = this.game.getNextScene();
    }
    start() {
        this.gameLoop();
    }
    gameLoop() {
        const gameLoopStep = () => {
            this.processInput();
            if (this.currentGameScene.isSceneComplete()) {
                this.currentGameScene = this.game.getNextScene();
            }
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
        else if (this.currentMenuState instanceof SwitchMenu) {
            this.switchMenu.updatePhils(this.game.getPhils()[0]);
            this.switchMenu.render();
        }
        else {
            throw new Error('Menus were not as expected.');
        }
        this.currentGameScene.render();
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
        if (this.currentMenuState instanceof BattleMenu) {
            this.processBattleMenuInput();
        }
        else if (this.currentMenuState instanceof MoveMenu) {
            this.processMoveMenuInput();
        }
        else if (this.currentMenuState instanceof SwitchMenu) {
            this.processSwitchMenuInput();
        }
        else {
            throw new Error("Menu state not as expected.");
        }
    }
    processBattleMenuInput() {
        // Switch menu state if applicable
        let newState = this.mainBattleMenu.getNextState();
        if (newState != null) {
            this.changeMenuState(newState);
        }
    }
    processMoveMenuInput() {
        // Switch menu state if applicable
        let newState = this.moveMenu.getNextState();
        if (newState != null) {
            this.changeMenuState(newState);
        }
        // Make new move if applicable
        let newMove = this.moveMenu.getNextMove();
        if (newMove != null) {
            this.game.makeMove(newMove.deepCopy());
        }
    }
    processSwitchMenuInput() {
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
