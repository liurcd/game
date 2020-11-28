class Player1 {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;

        this.width = 0;
        this.height = 0;
    
        this.sprite = new Image();
        this.sprite.src = './assets/img/dog.sprite.png';
        this.sprite.horizontalFrames = 2;
        this.sprite.verticalFrames = 4;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.drawCount = 0

        this.sprite.isReady = false;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
        }

        this.movements = {
            up: false,
            right: false,
            left: false,
            down: false
        }
    }

    isReady() {
        return this.sprite.isReady;
    }

    onKeyEvent(event) {
        const status = event.type === 'keydown';
        switch (event.keyCode) {
          case P1_KEY_UP:
            this.movements.up = status;
            break;
          case P1_KEY_DOWN:
            this.movements.down = status;
            break;
          case P1_KEY_RIGHT:
            this.movements.right = status;
            break;
          case P1_KEY_LEFT:
            this.movements.left = status;
            break;
        }
    }

    draw() {
        if (this.isReady()) {
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
    };

    move() {
        if (this.movements.left) {
            this.vx = -SPEED;
        } else if (this.movements.right) {
            this.vx = SPEED;
        } else {
            this.vx = 0;
        }

        if(this.movements.up) {
            this.vy = -SPEED;
        } else if (this.movements.down) {
            this.vy = SPEED;
        } else {
            this.vy = 0;
        }

        this.x += this.vx;
        this.y += this.vy;
    }

    animate() {
        if (this.movements.left) {
            this.animateSprite(3, 0, MOVEMENT_FRAMES);
        } else if (this.movements.right) {
            this.animateSprite(1, 0, MOVEMENT_FRAMES);
        } else if (this.movements.up) {
            this.animateSprite(2, 0, MOVEMENT_FRAMES);
        } else if (this.movements.down) {
            this.animateSprite(0, 0, MOVEMENT_FRAMES);
        }
    }

    animateSprite(initialVerticalIndex, initialHorizontalIndex, frequency) {
        this.sprite.verticalFrameIndex = initialVerticalIndex;
        this.sprite.horizontalFrameIndex = initialHorizontalIndex;
        if (this.sprite.drawCount % frequency === 0) {
            this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
            this.sprite.drawCount = 0;
        }
    }
}