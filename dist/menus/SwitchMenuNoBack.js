import { SwitchMenu } from "./SwitchMenu.js";
import { MenuType } from "../StateManager.js";
export class SwitchMenuNoBack extends SwitchMenu {
    constructor(ctx, gameCopy) {
        super(ctx, gameCopy);
    }
    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = '#9FB4C7';
        this.ctx.fillRect(0, 0, 1000, 1000);
        this.menuItems = [];
        let yourPhils = this.gameCopy.getPhils()[this.gameCopy.getTurnToMove()];
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
                }
            });
        }
        // The remaining code from the render method
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