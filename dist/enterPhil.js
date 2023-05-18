export class EnterPhil {
    constructor(ctx, phil, x, y, h, w) {
        this.ctx = ctx;
        this.phil = phil;
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
    }
    render() {
        let image = this.phil.getLoadedImage();
        if (image != null) {
            // this.ctx.clearRect(0, 
            //     0, 
            //     this.ctx.canvas.width, 
            //     this.ctx.canvas.height * .75);
            this.ctx.clearRect(this.x, this.y, this.w, this.h);
            this.ctx.fillStyle = '#9FB4C7';
            this.ctx.fillRect(this.x, this.y, this.w, this.h);
            this.ctx.drawImage(image, this.x, this.y, this.w, this.h);
        }
    }
    getNextState() {
        throw new Error('Method not implemented.');
    }
}
