import { Game } from "phaser";
import { GameScene } from "../GameState";
import { ImageRepository } from "../ImageRepository";
import { YourPhilEnters } from "./YourPhilEnters";
import { YourPhilLeaves } from "./YourPhilLeaves";

export class PhilSwaps implements GameScene {
    constructor(private leaveScene: GameScene, private enterScene: GameScene) {}
    
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