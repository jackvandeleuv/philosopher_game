export class TheirPhilLeaves {
    constructor(ctx, phil1, phil2, imageRepo) {
        this.ctx = ctx;
        this.phil1 = phil1;
        this.phil2 = phil2;
        this.imageRepo = imageRepo;
        this.sceneComplete = false;
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.x = this.ctx.canvas.width / 1.55;
        this.platformX = this.x;
        this.y = this.ctx.canvas.width / 9;
        this.w = this.ctx.canvas.width / 5.4;
        this.h = this.ctx.canvas.width / 5.4;
    }
    updatePhilPosition() {
        if (this.x + this.w > 0) {
            this.x = this.x + this.ctx.canvas.width / 200;
        }
    }
    checkPhil2OutOfBounds() {
        if (this.x >= this.ctx.canvas.width) {
            this.sceneComplete = true;
        }
    }
    drawReversedPhil2() {
        let phil2Image = this.imageRepo.getImage(this.phil2.getImagePath());
        if (phil2Image != null) {
            // Save the context state
            this.ctx.save();
            // Move to the center of the image, scale it negatively on x axis, 
            // then move it back
            this.ctx.translate(this.x + this.w / 2, 0);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-(this.x + this.w / 2), 0);
            // Draw the mirrored image
            this.ctx.drawImage(phil2Image, this.x, this.y, this.w, this.h);
            // Restore the context to the previous state
            this.ctx.restore();
        }
    }
    drawBattleMinusYourPhil() {
        this.drawPlatform(this.platformX + (this.w / 2), this.y + this.h, this.w * .8, this.h * .2);
        let image = this.imageRepo.getImage(this.phil1.getImagePath());
        if (image != null) {
            let x2 = this.ctx.canvas.width / 6.4;
            let y2 = this.ctx.canvas.width / 3.6;
            let w2 = this.ctx.canvas.width / 3.6;
            let h2 = this.ctx.canvas.width / 3.6;
            this.drawPlatform(x2 + (w2 / 2), y2 + h2, this.w * .8, this.h * .2);
            this.ctx.drawImage(image, x2, y2, w2, h2);
        }
    }
    render() {
        this.drawBattleMinusYourPhil();
        this.updatePhilPosition();
        this.checkPhil2OutOfBounds();
        this.drawReversedPhil2();
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
