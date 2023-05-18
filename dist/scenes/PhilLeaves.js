export class YourPhilLeaves {
    constructor(ctx, phil) {
        this.ctx = ctx;
        this.phil = phil;
        this.sceneComplete = false;
        this.x = this.ctx.canvas.width / 6.4;
        this.y = this.ctx.canvas.width / 3.6;
        this.w = this.ctx.canvas.width / 3.6;
        this.h = this.ctx.canvas.width / 3.6;
    }
    clearPhilImage() {
        this.ctx.clearRect(this.x, this.y, this.w, this.h);
    }
    updatePhilPosition() {
        if (this.x + this.w > 0) {
            this.x = this.x - this.ctx.canvas.width / 1000;
        }
    }
    checkPhilOutOfBounds() {
        if (this.x + this.w <= 0) {
            this.sceneComplete = true;
        }
    }
    drawReversed() {
        // Save the context state
        this.ctx.save();
        // Move to the center of the image, scale it negatively on x axis, 
        // then move it back
        this.ctx.translate(this.x + this.w / 2, 0);
        this.ctx.scale(-1, 1);
        this.ctx.translate(-(this.x + this.w / 2), 0);
        // Draw the mirrored image
        this.ctx.drawImage(this.phil.getIcon(), this.x, this.y, this.w, this.h);
        // Restore the context to the previous state
        this.ctx.restore();
    }
    render() {
        if (this.phil.iconLoaded()) {
            let image = this.phil.getIcon();
            this.drawPlatform(this.x + (this.w / 2), this.y + this.h, this.w * .8, this.h * .2);
            this.clearPhilImage();
            this.updatePhilPosition();
            this.checkPhilOutOfBounds();
            this.drawReversed();
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
