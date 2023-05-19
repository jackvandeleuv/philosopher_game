import { GameScene } from "../GameState";
import { YourPhilEnters } from "./YourPhilEnters";
import { YourPhilLeaves } from "./YourPhilLeaves";

export class YourPhilSwaps implements GameScene {
    constructor(private leaveScene: YourPhilLeaves, private enterScene: YourPhilEnters, ) {}
    
    isSceneComplete(): boolean {
        return this.leaveScene.isSceneComplete() && this.enterScene.isSceneComplete();
    }

    render() {
        if (!this.leaveScene.isSceneComplete()) {
            this.leaveScene.render();
        }
        if (this.leaveScene.isSceneComplete() && !this.enterScene.isSceneComplete()) {
            this.enterScene.render();
        }
    }
}