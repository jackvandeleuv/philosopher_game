"use strict";
// import { MenuType } from '../StateManager.js';
// import { Philosopher } from '../entities/Philosopher.js';
// import { GameScene } from '../GameState.js';
// export class EnterPhil implements GameScene {
//     constructor(private ctx: CanvasRenderingContext2D, 
//                 private phil: Philosopher,
//                 private x: number,
//                 private y: number,
//                 private h: number,
//                 private w: number) {}
//     render(): void {
//         if (this.phil.iconLoaded()) {
//             let image = this.phil.getIcon();
//             this.ctx.clearRect(this.x, this.y, this.w, this.h);
//             this.ctx.drawImage(image, this.x, this.y, this.w, this.h);
//         }
//     }
//     getNextState(): MenuType | null {
//         throw new Error('Method not implemented.');
//     }
// }
