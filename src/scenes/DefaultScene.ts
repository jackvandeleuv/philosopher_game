import { Philosopher } from '../entities/Philosopher.js';
import { GameScene } from '../GameState.js';
import { ImageRepository } from '../ImageRepository.js';

export class DefaultScene implements GameScene {
    private sceneComplete: boolean = true;

    constructor(private ctx: CanvasRenderingContext2D, 
                private phil1: Philosopher,
                private phil2: Philosopher,
                private imageRepo: ImageRepository) {}

    render(): void {
        let x = this.ctx.canvas.width / 6.4;
        let y = this.ctx.canvas.width / 3.6;
        let w = this.ctx.canvas.width / 3.6;
        let h = this.ctx.canvas.width / 3.6;

        let image1 = this.imageRepo.getImage(this.phil1.getImagePath());
        if (image1 != null) {
            this.drawPlatform(x + (w / 2), y + h, w * .8, h * .2);
            this.ctx.clearRect(x, y, w, h);
            this.ctx.drawImage(image1, x, y, w, h);
        }

        let image2 = this.imageRepo.getImage(this.phil2.getImagePath());
        if (image2 != null){
            let x2 = this.ctx.canvas.width / 1.55;
            let y2 = this.ctx.canvas.width / 9;
            let w2 = this.ctx.canvas.width / 5.4;
            let h2 = this.ctx.canvas.width / 5.4;

            this.drawPlatform(x2 + (w2 / 2), y2 + h2, w * .8, h * .2);
            this.ctx.clearRect(x2, y2, w2, h2);
        
            // Save the context state
            this.ctx.save(); 
            
            // Move to the center of the image, scale it negatively on x axis, then move it back
            this.ctx.translate(x2 + w2 / 2, 0); 
            this.ctx.scale(-1, 1);
            this.ctx.translate(-(x2 + w2 / 2), 0);
            
            // Draw the mirrored image
            this.ctx.drawImage(image2, x2, y2, w2, h2);
            
            // Restore the context to the previous state
            this.ctx.restore(); 
        }

        if (this.phil1.getImagePath() && this.phil2.getImagePath()) {
            this.sceneComplete = true;
        }
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