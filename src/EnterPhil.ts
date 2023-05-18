import { MenuType } from './Game.js';
import { Philosopher } from './Philosopher.js';
import { State } from './State.js';

export class EnterPhil implements State {

    constructor(private ctx: CanvasRenderingContext2D, private philToEnter: Philosopher) {}

    render(): void {
        let icon = new Image();
        icon.src = this.philToEnter.getImage();
        this.ctx.drawImage(icon, 100, 100);
    }

    getNextState(): MenuType | null {
        throw new Error('Method not implemented.');
    }


}