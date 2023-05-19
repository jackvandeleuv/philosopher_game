import { MenuButton } from './MenuButton.js';
import { GameScene, MenuState } from '../GameState.js'
import { MenuType } from '../StateManager.js';
import { Philosopher } from '../entities/Philosopher.js';
import { YourPhilEnters } from '../scenes/YourPhilEnters.js';
import { YourPhilSwaps } from '../scenes/YourPhilSwaps.js';
import { YourPhilLeaves } from '../scenes/YourPhilLeaves.js';
import { Game } from '../Game.js';

export class SwitchMenu implements MenuState {
    private nextMenuState: MenuType | null = null;
    private nextGameScene: GameScene | null = null;
    private nextPhil: Philosopher | null = null;
    private menuItems: MenuButton[] = [];
    private buttonWidth = this.ctx.canvas.width * (2 / 3);
    private buttonHeight = this.ctx.canvas.height / 18;
    private spacing = this.ctx.canvas.width / 15;
    private y = this.ctx.canvas.height * (5 / 8);
    private x = (this.ctx.canvas.width - this.buttonWidth) / 2;

    constructor(private ctx: CanvasRenderingContext2D, private gameCopy: Game) {
        // Bind 'this' from MainBattleMenu to handleClick to avoid ambiguity when 
        // firing from a different context.
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = '#9FB4C7';
        this.ctx.fillRect(0, 0, 1000, 1000);
    
        this.menuItems = [];
        let yourPhils: Philosopher[] = this.gameCopy.getPhils()[this.gameCopy.getTurnToMove()];
        for (let i = 0; i < yourPhils.length; i++) {
            this.menuItems.push({
                text: yourPhils[i].toString(),
                x: this.x,
                y: this.y + this.spacing * i,
                width: this.buttonWidth,
                height: this.buttonHeight,
                action: () => {
                    this.nextPhil = yourPhils[i].deepCopy();
                    this.nextMenuState = MenuType.MainBattleMenu;
                    this.nextGameScene = new YourPhilSwaps(
                        new YourPhilLeaves(this.ctx, 
                                            this.gameCopy.getPhilToMove().deepCopy(), 
                                            this.gameCopy.getPhilToDefend().deepCopy()
                                            ),
                        new YourPhilEnters(this.ctx, 
                                            yourPhils[i].deepCopy(), 
                                            this.gameCopy.getPhilToDefend().deepCopy()
                                            )
                    );
                }
            })
        }

        this.menuItems.push({
            text: 'Back',
            x: this.x,
            y: this.y + this.spacing * yourPhils.length,
            width: this.buttonWidth,
            height: this.buttonHeight,
            action: () => this.nextMenuState = MenuType.MainBattleMenu  
        })
    
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
    
            // Draw rounded rectangle buttons
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
    
        let fontSize = this.ctx.canvas.width / 38;
        this.ctx.font = fontSize + 'px Arial';

        for (let item of this.menuItems) {        
            this.ctx.fillStyle = '#EEEEFF';
            let textWidth = this.ctx.measureText(item.text).width;
            let textX = item.x + ((item.width - textWidth) / 2);
            let textY = item.y + (item.height / 2) + (fontSize / 3);
            this.ctx.fillText(item.text, textX, textY);
        }
    }

    updateGameCopy(gameCopy: Game) {
        this.gameCopy = gameCopy.deepCopy();
    }

    /* 
    Rounded rectangle function 
    */
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

    getNextMenuState(): MenuType | null {
        let nextState = this.nextMenuState;
        this.nextMenuState = null;
        return nextState;
    }

    getNextGameScene(): GameScene | null {
        let nextScene = this.nextGameScene;
        this.nextGameScene = null;
        return nextScene;
    }

    getNextPhil(): Philosopher | null {
        if (this.nextPhil == null) {
            return null;
        }
        let nextPhil = this.nextPhil;
        this.nextPhil = null;
        return nextPhil;
    }
}
