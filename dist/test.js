"use strict";
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const witty = new Image();
const berty = new Image();
witty.src = '../images/wittgenstein.jpg';
berty.src = '../images/russell.jpg';
if (context != null) {
    context.fillStyle = 'lightBlue';
    context.fillRect(0, 0, 1000, 1000);
    let wittyX = 50;
    let wittyY = 300;
    witty.onload = () => {
        context.drawImage(witty, wittyX, wittyY, 200, 200);
    };
    berty.onload = () => {
        context.drawImage(berty, 700, 300, 200, 200);
    };
    let signX = -8;
    let signY = -8;
    let lastTime = 0;
    function drawImage(now) {
        const timeChange = now - lastTime;
        lastTime = now;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'lightBlue';
        context.fillRect(0, 0, 1000, 1000);
        if (wittyX >= canvas.width - 200 || wittyX <= 0) {
            signX = signX * -1 * (Math.random() + .5);
        }
        if (wittyY >= canvas.width - 200 || wittyY <= 0) {
            signY = signY * -1 * (Math.random() + .5);
        }
        wittyY = wittyY + signY;
        wittyX = wittyX + signX;
        context.drawImage(witty, wittyX, wittyY, 200, 200);
        requestAnimationFrame(drawImage);
    }
    drawImage();
}
