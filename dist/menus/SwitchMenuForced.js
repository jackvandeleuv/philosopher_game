import { SwitchMenu } from "./SwitchMenu";
import { MenuType } from "../StateManager";
export class SwitchMenuForced extends SwitchMenu {
    constructor(ctx) {
        super(ctx);
        this.nextState = null;
        this.nextPhil = null;
        this.menuItems = [];
        this.buttonWidth = this.ctx.canvas.width * (2 / 3);
        this.buttonHeight = this.ctx.canvas.height / 18;
        this.spacing = this.ctx.canvas.width / 15;
        this.y = this.ctx.canvas.height * (5 / 8);
        this.x = (this.ctx.canvas.width - this.buttonWidth) / 2;
        this.yourPhils = [];
        this.ctx = ctx;
    }
    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = '#9FB4C7';
        this.ctx.fillRect(0, 0, 1000, 1000);
        this.menuItems = [];
        for (let i = 0; i < this.yourPhils.length; i++) {
            this.menuItems.push({
                text: this.yourPhils[i].toString(),
                x: this.x,
                y: this.y + this.spacing * i,
                width: this.buttonWidth,
                height: this.buttonHeight,
                action: () => {
                    this.nextPhil = this.yourPhils[i].deepCopy();
                    this.nextState = MenuType.MainBattleMenu;
                }
            });
        }
        this.menuItems.push({
            text: 'Back',
            x: this.x,
            y: this.y + this.spacing * this.yourPhils.length,
            width: this.buttonWidth,
            height: this.buttonHeight,
            action: () => this.nextState = MenuType.MainBattleMenu
        });
        for (let item of this.menuItems) {
            // Ensure the item is within the menu area
            if (this.x + this.spacing > this.ctx.canvas.width)
                break;
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
            this.roundRect(item.x, item.y, item.width, item.height, 10);
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
}
