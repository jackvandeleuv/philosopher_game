import { Philosopher } from '../entities/Philosopher.js';
import { GameScene } from '../GameState.js';
import { ImageRepository } from '../ImageRepository.js';

export class DefaultScene implements GameScene {
    private sceneComplete: boolean = true;
    private x = this.ctx.canvas.width / 6.4;
    private y = this.ctx.canvas.width / 3.6;
    private w = this.ctx.canvas.width / 3.6;
    private h = this.ctx.canvas.width / 3.6;
    private x2 = this.ctx.canvas.width / 1.55;
    private y2 = this.ctx.canvas.width / 9;
    private w2 = this.ctx.canvas.width / 5.4;
    private h2 = this.ctx.canvas.width / 5.4;

    constructor(private ctx: CanvasRenderingContext2D, 
                private phil1: Philosopher,
                private phil2: Philosopher,
                private imageRepo: ImageRepository) {}

    render(): void {
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

    getPhil1Position(): number[] {
        return [this.x, this.y];
    }

    getPhil2Position(): number[] {
        return [this.x2, this.y2];
    }

    private drawPlatform(x: number, y: number, radiusX: number, radiusY: number): void {
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI); // draw the oval
        this.ctx.stroke();
        this.ctx.fillStyle = '#9FB798';
        this.ctx.fill();
        this.ctx.closePath();
    }

    isSceneComplete(): boolean {
        return this.sceneComplete;
    }

}