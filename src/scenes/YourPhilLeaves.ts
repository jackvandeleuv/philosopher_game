import { Philosopher } from '../entities/Philosopher.js';
import { GameScene } from '../GameState.js';

export class YourPhilLeaves implements GameScene {
    private sceneComplete = false;
    private x: number;
    private platformX: number;
    private y: number;
    private w: number;
    private h: number;

    constructor(private ctx: CanvasRenderingContext2D, private phil1: Philosopher, private phil2: Philosopher) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.x = this.ctx.canvas.width / 6.4;
        this.platformX = this.x;
        this.y = this.ctx.canvas.width / 3.6;
        this.w = this.ctx.canvas.width / 3.6;
        this.h = this.ctx.canvas.width / 3.6;
    }

    private updatePhilPosition(): void {
        if (this.x + this.w > 0) {
            this.x = this.x - this.ctx.canvas.width / 150;
        }
    }

    private checkPhil1OutOfBounds(): void {
        if (this.x + this.w <= 0) {
            this.sceneComplete = true;
        }
    }

    private drawReversed() {
        // Save the context state
        this.ctx.save(); 

        // Move to the center of the image, scale it negatively on x axis, 
        // then move it back
        this.ctx.translate(this.x + this.w / 2, 0); 
        this.ctx.scale(-1, 1);
        this.ctx.translate(-(this.x + this.w / 2), 0);
        
        // Draw the mirrored image
        this.ctx.drawImage(this.phil1.getIcon(), this.x, this.y, this.w, this.h);
        
        // Restore the context to the previous state
        this.ctx.restore(); 
    }

    private drawBattleMinusYourPhil() {
        this.drawPlatform(this.platformX + (this.w / 2), this.y + this.h, this.w * .8, this.h * .2);

        if (this.phil2.iconLoaded()){
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

    render(): void {
        this.drawBattleMinusYourPhil();
        if (this.phil1.iconLoaded()) {
            this.drawPlatform(this.platformX + (this.w / 2), this.y + this.h, this.w * .8, this.h * .2);
            this.updatePhilPosition();
            this.checkPhil1OutOfBounds();
            this.drawReversed();
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