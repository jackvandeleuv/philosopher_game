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
        if (this.phil.iconLoaded()) {
            let image = this.phil.getIcon();
            this.ctx.clearRect(this.x, this.y, this.w, this.h);
            this.ctx.drawImage(image, this.x, this.y, this.w, this.h);
        }
    }
    getNextState() {
        throw new Error('Method not implemented.');
    }
}
