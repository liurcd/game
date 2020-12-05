class Obstacles {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 70
        this.height = 70
    }

    draw() {
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}