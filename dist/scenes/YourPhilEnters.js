export class YourPhilEnters {
    constructor(ctx, phil1, phil2) {
        this.ctx = ctx;
        this.phil1 = phil1;
        this.phil2 = phil2;
        this.sceneComplete = false;
        this.x = -200;
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.platformX = this.ctx.canvas.width / 6.4;
        this.destinationX = this.platformX;
        this.y = this.ctx.canvas.width / 3.6;
        this.w = this.ctx.canvas.width / 3.6;
        this.h = this.ctx.canvas.width / 3.6;
        this.phil1.getIcon().onload = () => {
            this.x = 0 - this.phil1.getIcon().width;
        };
    }
    drawPhil1() {
        this.ctx.drawImage(this.phil1.getIcon(), this.x, this.y, this.w, this.h);
    }
    updatePhilPosition() {
        if (this.x < this.destinationX) {
            this.x = this.x + (this.ctx.canvas.width / 150);
        }
    }
    checkPhil1AtDestination() {
        if (this.x == this.destinationX) {
            this.sceneComplete = true;
        }
    }
    drawBattleMinusYourPhil() {
        this.drawPlatform(this.platformX + (this.w / 2), this.y + this.h, this.w * .8, this.h * .2);
        if (this.phil2.iconLoaded()) {
            let x2 = this.ctx.canvas.width / 1.55;
            let y2 = this.ctx.canvas.width / 9;
            let w2 = this.ctx.canvas.width / 5.4;
            let h2 = this.ctx.canvas.width / 5.4;
            let image = this.phil2.getIcon();
            this.drawPlatform(x2 + (w2 / 2), y2 + h2, this.w * .8, this.h * .2);
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
    }
    render() {
        this.drawBattleMinusYourPhil();
        if (this.phil1.iconLoaded()) {
            this.updatePhilPosition();
            this.checkPhil1AtDestination();
            this.drawPhil1();
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
