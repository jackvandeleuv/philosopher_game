export class DamageMarker {
    constructor(defaultScene, damage, ctx, youDealDamage) {
        this.defaultScene = defaultScene;
        this.damage = damage;
        this.ctx = ctx;
        this.life = 1;
        this.isComplete = false;
        if (youDealDamage) {
            this.x = defaultScene.getPhil2Position()[0];
            this.y = defaultScene.getPhil2Position()[1];
        }
        else {
            this.x = defaultScene.getPhil1Position()[0];
            this.y = defaultScene.getPhil1Position()[1];
        }
    }
    isSceneComplete() {
        return this.isComplete;
    }
    render() {
        this.defaultScene.render();
        // Draw floating number
        this.ctx.fillStyle = 'red';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(this.damage.toString(), this.x, this.y);
        this.y -= 1; // move up
        this.life -= 0.02; // fade out
        if (this.life <= 0) {
            this.isComplete = true;
        }
    }
}
