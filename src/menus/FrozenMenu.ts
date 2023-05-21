import { MenuButton } from './MenuButton.js';
import { MenuState } from '../GameState.js'
import { MenuFlag } from '../StateManager.js';
 
export class FrozenMenu implements MenuState {
    private nextState: MenuFlag | null = null;
    private buttonWidth = this.ctx.canvas.width / 1.5;
    private buttonHeight = this.ctx.canvas.height / 10;
    private y = this.ctx.canvas.height * 5 / 6;
    private x = (this.ctx.canvas.width / 2) - (this.buttonWidth / 2);

    private menuItems: MenuButton[] = [
        {
            text: 'Wait for your opponent to move...',
            x: this.x,
            y: this.y,
            height: this.buttonHeight,
            width: this.buttonWidth,
            action: () => {}
        }
    ]

    constructor(private ctx: CanvasRenderingContext2D) {
        // Bind 'this' from MainBattleMenu to handleClick to avoid ambiguity when 
        // firing from a different context.
        this.handleClick = this.handleClick.bind(this); 
    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = '#9FB4C7';
        this.ctx.fillRect(0, 0, 1000, 1000);
    
        for (let item of this.menuItems) {
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

    deactivate(): void {
        this.ctx.canvas.removeEventListener('click', this.handleClick);
    }

    activate(): void {
        this.ctx.canvas.addEventListener('click', this.handleClick);
    }

    private handleClick(e: any): void {
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

    getNextMenuState(): MenuFlag | null {
        let nextState = this.nextState;
        this.nextState = null;
        return nextState;
    }
 
}

