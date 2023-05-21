import { GameScene } from '../GameState.js'
import { DefaultScene } from './DefaultScene.js';

export class DamageMarker implements GameScene {
    private x: number;
    private y: number;
    private life = 1;
    private isComplete = false;

    constructor(private defaultScene: DefaultScene, private damage: number, private ctx: CanvasRenderingContext2D, youDealDamage: boolean) {
        if (youDealDamage) {
            this.x = defaultScene.getPhil2Position()[0];
            this.y = defaultScene.getPhil2Position()[1];
        } else {
            this.x = defaultScene.getPhil1Position()[0];
            this.y = defaultScene.getPhil1Position()[1];
        }
    }

    isSceneComplete(): boolean {
        return this.isComplete;
    }

    render(): void {
        this.defaultScene.render();

        // Draw floating number
        this.ctx.fillStyle = 'red';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(this.damage.toString(), this.x, this.y);
    
        this.y -= 1;  // move up
        this.life -= 0.02;  // fade out

        if (this.life <= 0) {
            this.isComplete = true;
        }
    }

    }

 