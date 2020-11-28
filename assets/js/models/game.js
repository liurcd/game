class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = 600;
        this.canvas.width = 1024;

        this.fps = 1000 / 60;
        this.drawIntervalId = undefined;

        this.background = new Background(this.ctx);
        this.player1 = new Player1(this.ctx, 10, 10);
        this.player2 = new Player2(this.ctx, 50, 50);
    }

    start() {
        this.drawIntervalId = setInterval(() => {
            this.clear();
            this.move();
            this.draw();
        }, this.fps)
    }

    onKeyEvent(event) {
        this.player1.onKeyEvent(event);
        this.player2.onKeyEvent(event);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.background.draw();
        this.player1.draw();
        this.player2.draw();
    }

    move() {
        this.player1.move();
        this.player2.move();
    }

    checkCollision() {
        const 
        if (this.player1.collidesWith(this.player2)) {
            console.log("Player 1 Wins")
        }
    }
}