export function renderMainBattleMenu(ctx, activePhil) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#9FB4C7';
    ctx.fillRect(0, 0, 1000, 1000);
    ctx.font = '30px Arial';
    let canvasHeight = ctx.canvas.height;
    let canvasWidth = ctx.canvas.width;
    // Calculate the height and position of the menu
    let menuHeight = canvasHeight / 6;
    let menuY = canvasHeight - menuHeight;
    // Define spacing and starting x position
    let spacing = canvasWidth / 3.3;
    let buttonWidth = 250;
    let buttonHeight = 75;
    let x = (canvasWidth - (spacing * 2 + buttonWidth)) / 2;
    let menuItems = [
        {
            text: 'Philosophize!',
            x: x + spacing * 0,
            y: menuY,
            height: buttonHeight,
            width: buttonWidth,
            action: () => renderMoveMenu(ctx, activePhil.getMoves())
        },
        {
            text: 'Switch',
            x: x + spacing * 1,
            y: menuY,
            height: buttonHeight,
            width: buttonWidth,
            action: () => console.log('Switch')
        },
        {
            text: 'Resign',
            x: x + spacing * 2,
            y: menuY,
            height: buttonHeight,
            width: buttonWidth,
            action: () => console.log('Resign')
        }
    ];
    // Rounded rectangle function
    function roundRect(ctx, x, y, w, h, r) {
        if (w < 2 * r)
            r = w / 2;
        if (h < 2 * r)
            r = h / 2;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }
    ctx.canvas.addEventListener('click', function (e) {
        let rect = ctx.canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        for (let item of menuItems) {
            if (x >= item.x && x <= item.x + item.width && y >= item.y && y <= item.y + item.height) {
                item.action();
                break;
            }
        }
    });
    for (let i = 0; i < menuItems.length; i++) {
        if (x + spacing > canvasWidth)
            break; // Ensure the item is within the menu area
        // Gradient
        let gradient = ctx.createLinearGradient(0, 0, 0, 170);
        gradient.addColorStop(0, '#9FB4C7');
        gradient.addColorStop(1, '#28587B');
        // Shadows
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        // Draw rounded rectangle
        roundRect(ctx, menuItems[i].x, menuItems[i].y, menuItems[i].width, menuItems[i].height, 10);
        ctx.fillStyle = gradient;
        ctx.fill();
        // Reset shadows
        ctx.shadowColor = 'transparent';
        // Center-aligned text
        let metrics = ctx.measureText(menuItems[i].text);
        let textWidth = metrics.width;
        ctx.fillStyle = '#EEEEFF';
        ctx.fillText(menuItems[i].text, menuItems[i].x + (menuItems[i].width - textWidth) / 2, menuItems[i].y + 50);
    }
}
export function renderMoveMenu(ctx, moves) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#9FB4C7';
    ctx.fillRect(0, 0, 1000, 1000);
    ctx.font = '30px Arial';
    let canvasHeight = ctx.canvas.height;
    let canvasWidth = ctx.canvas.width;
    // Calculate the height and position of the menu
    let menuHeight = canvasHeight / 6;
    let menuY = canvasHeight - menuHeight;
    // Define spacing and starting x position
    let spacing = canvasWidth / 3.3;
    let buttonWidth = 250;
    let buttonHeight = 75;
    let x = (canvasWidth - (spacing * 2 + buttonWidth)) / 2;
    let menuItems = [];
    for (let i = 0; i < moves.length; i++) {
        menuItems.push({
            text: moves[i].toString(),
            x: x + spacing * i,
            y: menuY,
            width: buttonWidth,
            height: buttonHeight,
            action: () => console.log(moves[i].toString())
        });
    }
    // Rounded rectangle function
    function roundRect(ctx, x, y, w, h, r) {
        if (w < 2 * r)
            r = w / 2;
        if (h < 2 * r)
            r = h / 2;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }
    ctx.canvas.addEventListener('click', function (e) {
        let rect = ctx.canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        for (let item of menuItems) {
            if (x >= item.x && x <= item.x + item.width && y >= item.y && y <= item.y + item.height) {
                item.action();
                break;
            }
        }
    });
    for (let i = 0; i < menuItems.length; i++) {
        if (x + spacing > canvasWidth)
            break; // Ensure the item is within the menu area
        // Gradient
        let gradient = ctx.createLinearGradient(0, 0, 0, 170);
        gradient.addColorStop(0, '#9FB4C7');
        gradient.addColorStop(1, '#28587B');
        // Shadows
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        // Draw rounded rectangle
        roundRect(ctx, menuItems[i].x, menuItems[i].y, menuItems[i].width, menuItems[i].height, 10);
        ctx.fillStyle = gradient;
        ctx.fill();
        // Reset shadows
        ctx.shadowColor = 'transparent';
        // Center-aligned text
        let fontSize = 30; // initial font size
        let textWidth;
        do {
            ctx.font = fontSize + 'px Arial'; // Set the current font size
            let metrics = ctx.measureText(menuItems[i].text);
            textWidth = metrics.width;
            if (textWidth > menuItems[i].width) {
                fontSize--; // Reduce the font size if the text is too wide
            }
        } while (textWidth > menuItems[i].width && fontSize > 0); // Ensure the font size doesn't become 0 or negative
        ctx.fillStyle = '#EEEEFF';
        ctx.fillText(menuItems[i].text, menuItems[i].x + (menuItems[i].width - textWidth) / 2, menuItems[i].y + 50);
    }
}
