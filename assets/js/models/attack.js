class Attack {
    constructor(ctx, x, y, direction, sprite) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = SPEED + 1;
        this.vy = SPEED + 1;
        this.direction = direction;

        this.sprite = new Image();
        this.sprite.src = sprite;
        this.sprite.horizontalFrames = 2;
        this.sprite.verticalFrames = 4;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.drawCount = 0;

        this.sprite.isReady = false;
        this.sprite.onload = () => {
            this.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
        }
    }

    draw() {
        this.ctx.drawImage(
            this.sprite,
            this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
            this.sprite.verticalFrameIndex * this.sprite.frameHeight,
            this.sprite.frameWidth,
            this.sprite.frameHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
        this.sprite.drawCount++;
        this.animate();

    }

    move() {
        switch (this.direction) {
            case "up":
                this.y -= this.vy;
                break;
            case "down":
                this.y += this.vy;
                break;
            case "left":
                this.x -= this.vx;
                break;
            case "right":
                this.x += this.vx;
                break;
        }
    }

    animate() {
        switch (this.direction) {
            case "up":
                this.animateSprite(0, MOVEMENT_FRAMES);
                break;
            case "down":
                this.animateSprite(3, MOVEMENT_FRAMES);
                break;
            case "left":
                this.animateSprite(1, MOVEMENT_FRAMES);
                break;
            case "right":
                this.animateSprite(2, MOVEMENT_FRAMES);
                break;
        }
    }

    animateSprite(initialVerticalIndex, frequency) {
        this.sprite.verticalFrameIndex = initialVerticalIndex;
        if (this.sprite.drawCount % frequency === 0) {
            this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
            this.sprite.drawCount = 0;
        }
    }

    checkCollide(o) {
        let colX = this.x + this.width > o.x && this.x + this.width < o.x + o.width + this.width;
        let colY = this.y + this.height > o.y && this.y + this.height < o.y + o.height + this.height;
        return colX && colY;
    }
}