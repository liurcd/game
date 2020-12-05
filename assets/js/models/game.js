class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = 600;
        this.canvas.width = 600;

        this.fps = 1000 / 60;
        this.drawIntervalId = undefined;

        this.background = new Background(this.ctx);
        this.player1 = new Player1(this.ctx, 10, 10);
        this.player2 = new Player2(this.ctx, 10, 10);
        this.obstacles = [
            new Obstacles(this.ctx, 60, 60),  new Obstacles(this.ctx, 195, 60), new Obstacles(this.ctx, 335, 60), new Obstacles(this.ctx, 470, 60),
            new Obstacles(this.ctx, 60, 195),  new Obstacles(this.ctx, 195, 195), new Obstacles(this.ctx, 335, 195), new Obstacles(this.ctx, 470, 195),
            new Obstacles(this.ctx, 60, 335),  new Obstacles(this.ctx, 195, 335), new Obstacles(this.ctx, 335, 335), new Obstacles(this.ctx, 470, 335),
            new Obstacles(this.ctx, 60, 470),  new Obstacles(this.ctx, 195, 470), new Obstacles(this.ctx, 335, 470), new Obstacles(this.ctx, 470, 470)
        ]
    }

    start() {
        this.drawIntervalId = setInterval(() => {
            this.clear();
            this.move();
            this.draw();
            this.checkCollisions();
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
        this.obstacles.forEach(o => o.draw());
    }

    move() {
        this.player1.move();
        this.player2.move();
    }

    checkPlayerCollisionWithObstacles(player) {
        return this.obstacles.some((o) => player.checkCollide(o));
    }

    stopPlayer(player) {
        player.x -= player.vx;
        player.y -= player.vy;
    }

    checkCollisions() {
        if (this.checkPlayerCollisionWithObstacles(this.player1)) {
            this.stopPlayer(this.player1);
        }
        if (this.checkPlayerCollisionWithObstacles(this.player2)) {
            this.stopPlayer(this.player2);
        }
        if (this.player1.kills(this.player2)) {
            //quitar vida
        }
        if (this.player2.kills(this.player1)) {
            //quitar vida
        }
    }
}