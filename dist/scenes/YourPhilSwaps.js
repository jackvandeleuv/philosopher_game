export class YourPhilSwaps {
    constructor(leaveScene, enterScene) {
        this.leaveScene = leaveScene;
        this.enterScene = enterScene;
    }
    isSceneComplete() {
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
