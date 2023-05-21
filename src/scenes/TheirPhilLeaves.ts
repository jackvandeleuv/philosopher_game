import { Philosopher } from '../entities/Philosopher.js';
import { GameScene } from '../GameState.js';
import { ImageRepository } from '../ImageRepository.js';

export class TheirPhilLeaves implements GameScene {
    private sceneComplete = false;
    private x: number;
    private platformX: number;
    private y: number;
    private w: number;
    private h: number;

    constructor(private ctx: CanvasRenderingContext2D, private phil1: Philosopher, private phil2: Philosopher, private imageRepo: ImageRepository) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.x = this.ctx.canvas.width / 1.55;
        this.platformX = this.x;
        this.y = this.ctx.canvas.width / 9;
        this.w = this.ctx.canvas.width / 5.4;
        this.h = this.ctx.canvas.width / 5.4;
    }

    private updatePhilPosition(): void {
        if (this.x < this.ctx.canvas.width) {
            this.x = this.x + this.ctx.canvas.width / 200;
        }
    }

    private checkPhil2OutOfBounds(): void {
        if (this.x >= this.ctx.canvas.width) {
            this.sceneComplete = true;
        }
    }

    private drawReversedPhil2() {
        let phil2Image = this.imageRepo.getImage(this.phil2.getImagePath());
        if (phil2Image != null) {
            this.ctx.drawImage(phil2Image, this.x, this.y, this.w, this.h);
        }
    }

    private drawBattleMinusYourPhil() {
        let image = this.imageRepo.getImage(this.phil1.getImagePath())
        if (image != null){
            let x2 = this.ctx.canvas.width / 6.4;
            let y2 = this.ctx.canvas.width / 3.6;
            let w2 = this.ctx.canvas.width / 3.6;
            let h2 = this.ctx.canvas.width / 3.6;

            this.drawPlatform(this.platformX + (this.w / 2), this.y + this.h, w2 * .8, h2 * .2);
            this.drawPlatform(x2 + (w2 / 2), y2 + h2, w2 * .8, h2 * .2);
            this.ctx.drawImage(image, x2, y2, w2, h2);
        }
    }

    render(): void {
        this.drawBattleMinusYourPhil();
        this.updatePhilPosition();
        this.checkPhil2OutOfBounds();
        this.drawReversedPhil2();
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