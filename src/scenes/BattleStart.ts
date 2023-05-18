import { MenuType } from '../StateManager.js';
import { Philosopher } from '../entities/Philosopher.js';
import { GameScene } from '../GameState.js';

export class BattleStart implements GameScene {

    constructor(private ctx: CanvasRenderingContext2D, 
                private phil1: Philosopher,
                private phil2: Philosopher) {}

    render(): void {
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

        if (this.phil2.iconLoaded()){
            let x2 = this.ctx.canvas.width / 1.55;
            let y2 = this.ctx.canvas.width / 9;
            let w2 = this.ctx.canvas.width / 5.4;
            let h2 = this.ctx.canvas.width / 5.4;
            let image = this.phil2.getIcon();

            this.drawPlatform(x2 + (w2 / 2), y2 + h2, w * .8, h * .2);
            this.ctx.clearRect(x2, y2, w2, h2);
            this.ctx.drawImage(image, x2, y2, w2, h2);
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



    getNextState(): MenuType | null {
        throw new Error('Method not implemented.');
    }


}