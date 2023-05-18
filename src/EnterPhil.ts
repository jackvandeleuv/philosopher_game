import { MenuType } from './StateManager.js';
import { Philosopher } from './Philosopher.js';
import { GameScene } from './GameState.js';

export class EnterPhil implements GameScene {

    constructor(private ctx: CanvasRenderingContext2D, 
                private phil: Philosopher,
                private x: number,
                private y: number,
                private h: number,
                private w: number) {}

    render(): void {
        let image = this.phil.getLoadedImage();

        if (image != null) {
            // this.ctx.clearRect(0, 
            //     0, 
            //     this.ctx.canvas.width, 
            //     this.ctx.canvas.height * .75);
            this.ctx.clearRect(this.x, this.y, this.w, this.h);
            this.ctx.fillStyle = '#9FB4C7';
            this.ctx.fillRect(this.x, this.y, this.w, this.h);
            this.ctx.drawImage(image, this.x, this.y, this.w, this.h);
        }

    }

    getNextState(): MenuType | null {
        throw new Error('Method not implemented.');
    }


}