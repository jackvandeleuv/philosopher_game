import { Move } from './Move.js';
import { Philosopher } from './Philosopher.js';
import { MenuButton } from './MenuButton.js';
import { State } from './State.js'
import { MenuState } from './Game.js';
 
export class MainBattleMenu implements State {
    private nextState: MenuState | null = null;
    private buttonWidth = this.ctx.canvas.width / 3.7;
    private buttonHeight = this.ctx.canvas.height / 14;
    private spacing = this.ctx.canvas.width / 3.2;
    private y = this.ctx.canvas.height * 5 / 6;
    private x = (this.ctx.canvas.width - (this.spacing * 2 + this.buttonWidth)) / 2;;

    private menuItems: MenuButton[] = [
        {
            text: 'Switch',
            x: this.x + this.spacing * 0,
            y: this.y,
            height: this.buttonHeight,
            width: this.buttonWidth,
            action: () => console.log('Switch')
        },
        {
            text: 'Philosophize!',
            x: this.x + this.spacing * 1,
            y: this.y,
            height: this.buttonHeight,
            width: this.buttonWidth,
            action: () => this.nextState = MenuState.MoveMenu
        },
        {
            text: 'Resign',
            x: this.x + this.spacing * 2,
            y: this.y,
            height: this.buttonHeight,
            width: this.buttonWidth,
            action: () => console.log('Resign')
        }
    ]

    constructor(private ctx: CanvasRenderingContext2D) {}

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = '#9FB4C7';
        this.ctx.fillRect(0, 0, 1000, 1000);
    
        for (let item of this.menuItems) {
            // Ensure the item is within the menu area
            if (this.x + this.spacing > this.ctx.canvas.width) break;

            // Gradient
            let gradient = this.ctx.createLinearGradient(0, 0, 0, 170);
            gradient.addColorStop(0, '#9FB4C7');
            gradient.addColorStop(1, '#28587B');
    
            // Shadows
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            this.ctx.shadowBlur = 5;
            this.ctx.shadowOffsetX = 3;
            this.ctx.shadowOffsetY = 3;
    
            // Draw rounded rectangle
            this.roundRect(item.x, 
                        item.y, 
                        item.width, 
                        item.height, 
                        10);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
    
            // Reset shadows
            this.ctx.shadowColor = 'transparent';
        }
    
        let fontSize = this.ctx.canvas.width / 28;
        this.ctx.font = fontSize + 'px Arial';

        for (let item of this.menuItems) {        
            this.ctx.fillStyle = '#EEEEFF';
            let textWidth = this.ctx.measureText(item.text).width;
            let textX = item.x + ((item.width - textWidth) / 2);
            let textY = item.y + (item.height / 2) + (fontSize / 3);
            this.ctx.fillText(item.text, textX, textY);
        }
    }
    
    // Rounded rectangle function 
    private roundRect(x: number, y: number, w: number, h: number, r: number) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x+r, y);
        this.ctx.arcTo(x+w, y,   x+w, y+h, r);
        this.ctx.arcTo(x+w, y+h, x,   y+h, r);
        this.ctx.arcTo(x,   y+h, x,   y,   r);
        this.ctx.arcTo(x,   y,   x+w, y,   r);
        this.ctx.closePath();
    }

    update(): void {
        
    }

    handleInput(): void {
        this.ctx.canvas.addEventListener('click', (e: MouseEvent) => {
            // Check to make sure we haven't switched menus.
            if (this.nextState == null) {
                let rect = this.ctx.canvas.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;
    
                for (let item of this.menuItems) {
                    if (x >= item.x && x <= item.x + item.width && y >= item.y && y <= item.y + item.height) {
                        item.action();
                        break;
                    } 
                }
            } 
        });
    }

    getNextState(): MenuState | null {
        return this.nextState;
    }
 
}

