import { GameScene } from "../GameState";

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