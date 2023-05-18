export class BattleStart {
    constructor(ctx, phil1, phil2) {
        this.ctx = ctx;
        this.phil1 = phil1;
        this.phil2 = phil2;
        this.sceneComplete = false;
    }
    render() {
        let x = this.ctx.canvas.width / 6.4;
        let y = this.ctx.canvas.width / 3.6;
        let w = this.ctx.canvas.width / 3.6;
        let h = this.ctx.canvas.width / 3.6;
        if (this.phil1.iconLoaded()) {
            let image = this.phil1.getIcon();
            this.drawPlatform(x + (w / 2), y + h, w * .8, h * .2);
            this.ctx.clearRect(x, y, w, h);
            this.ctx.drawImage(image, x, y, w, h);
        }
        if (this.phil2.iconLoaded()) {
            let x2 = this.ctx.canvas.width / 1.55;
            let y2 = this.ctx.canvas.width / 9;
            let w2 = this.ctx.canvas.width / 5.4;
            let h2 = this.ctx.canvas.width / 5.4;
            let image = this.phil2.getIcon();
            this.drawPlatform(x2 + (w2 / 2), y2 + h2, w * .8, h * .2);
            this.ctx.clearRect(x2, y2, w2, h2);
            // Save the context state
            this.ctx.save();
            // Move to the center of the image, scale it negatively on x axis, then move it back
            this.ctx.translate(x2 + w2 / 2, 0);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-(x2 + w2 / 2), 0);
            // Draw the mirrored image
            this.ctx.drawImage(image, x2, y2, w2, h2);
            // Restore the context to the previous state
            this.ctx.restore();
        }
        if (this.phil1.iconLoaded() && this.phil2.iconLoaded()) {
            this.sceneComplete = true;
        }
    }
    drawPlatform(x, y, radiusX, radiusY) {
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI); // draw the oval
        this.ctx.stroke();
        this.ctx.fillStyle = '#9FB798';
        this.ctx.fill();
        this.ctx.closePath();
    }
    isSceneComplete() {
        return this.sceneComplete;
    }
}
