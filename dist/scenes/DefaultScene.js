export class DefaultScene {
    constructor(ctx, phil1, phil2, imageRepo) {
        this.ctx = ctx;
        this.phil1 = phil1;
        this.phil2 = phil2;
        this.imageRepo = imageRepo;
        this.sceneComplete = true;
        this.x = this.ctx.canvas.width / 6.4;
        this.y = this.ctx.canvas.width / 3.6;
        this.w = this.ctx.canvas.width / 3.6;
        this.h = this.ctx.canvas.width / 3.6;
        this.x2 = this.ctx.canvas.width / 1.55;
        this.y2 = this.ctx.canvas.width / 9;
        this.w2 = this.ctx.canvas.width / 5.4;
        this.h2 = this.ctx.canvas.width / 5.4;
    }
    render() {
        this.drawPlatform(this.x + (this.w / 2), this.y + this.h, this.w * .8, this.h * .2);
        let image1 = this.imageRepo.getImage(this.phil1.getImagePath());
        if (image1 != null && !this.phil1.isRetired()) {
            this.ctx.drawImage(image1, this.x, this.y, this.w, this.h);
        }
        this.drawPlatform(this.x2 + (this.w2 / 2), this.y2 + this.h2, this.w * .8, this.h * .2);
        let image2 = this.imageRepo.getImage(this.phil2.getImagePath());
        if (image2 != null && !this.phil2.isRetired()) {
            // Save the context state
            this.ctx.save();
            // Move to the center of the image, scale it negatively on x axis, then move it back
            this.ctx.translate(this.x2 + this.w2 / 2, 0);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-(this.x2 + this.w2 / 2), 0);
            // Draw the mirrored image
            this.ctx.drawImage(image2, this.x2, this.y2, this.w2, this.h2);
            // Restore the context to the previous state
            this.ctx.restore();
        }
        if (this.phil1.getImagePath() && this.phil2.getImagePath()) {
            this.sceneComplete = true;
        }
    }
    getPhil1Position() {
        return [this.x, this.y];
    }
    getPhil2Position() {
        return [this.x2, this.y2];
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
