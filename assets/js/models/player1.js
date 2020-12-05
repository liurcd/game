class Player1 {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;

        this.maxX = this.ctx.canvas.width;
        this.minX = 0;
        this.maxY = this.ctx.canvas.height;
        this.minY = 0;

        this.direction = "down";

        this.width = 0;
        this.height = 0;
    
        this.sprite = new Image();
        this.sprite.src = './assets/img/growlithe.sprite.png';
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

        this.health = 2;
        this.canFire = true;
        this.bullets = [];
    }

    isReady() {
        return this.sprite.isReady;
    }

    onKeyEvent(event) {
        const status = event.type === 'keydown';
        switch (event.keyCode) {
          case P1_KEY_UP:
            this.movements.up = status;
            this.direction = "up"
            break;
          case P1_KEY_DOWN:
            this.movements.down = status;
            this.direction = "down"
            break;
          case P1_KEY_RIGHT:
            this.movements.right = status;
            this.direction = "right"
            break;
          case P1_KEY_LEFT:
            this.movements.left = status;
            this.direction = "left"
            break;
          case P1_KEY_ATTACK:
            if (this.canFire) {
                let attackX, attackY;
                switch (this.direction) {
                    case "down":
                        attackX = this.x + this.width / 2 - 6;
                        attackY = this.y + this.height;
                        break;
                    case "up":
                        attackX = this.x + this.width / 2 - 6;
                        attackY = this.y - 10;
                        break;
                    case "left":
                        attackX = this.x - 10;
                        attackY = this.y + this.height / 2 - 4;
                        break;
                    case "right":
                        attackX = this.x + this.width;
                        attackY = this.y + this.height / 2 - 4;
                        break;
                }
                this.bullets.push(new Attack(this.ctx, attackX, attackY, this.direction, './assets/img/fireball.sprite.png'));
                this.canFire = false;
                setTimeout(() => this.canFire = true, 500);
            }
            break;
        }
    }

    clear() {
        this.bullets = this.bullets.filter(bullet => 
            bullet.y >= this.minY &&
            bullet.y <= this.maxY &&
            bullet.x >= this.minX &&
            bullet.x <= this.maxX);
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

            // this.ctx.strokeRect(this.x, this.y, this.width, this.height)
            this.bullets.forEach(bullet => bullet.draw());
            this.sprite.drawCount++;
            this.animate();
        }
    };

    move() {
        this.bullets.forEach(bullet => bullet.move());

        if (this.movements.left) {
            this.vx = -SPEED;
        } else if (this.movements.right) {
            this.vx = SPEED;
        } else {
            this.vx = 0;
        }

        if (this.movements.up) {
            this.vy = -SPEED;
        } else if (this.movements.down) {
            this.vy = SPEED;
        } else {
            this.vy = 0;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x + this.width >= this.maxX || this.x <= this.minX) {
            this.x -= this.vx;
        } else if (this.y + this.height >= this.maxY || this.y <= this.minY) {
            this.y -= this.vy;
        }
    }

    animate() {
        if (this.movements.left) {
            this.animateSprite(3, MOVEMENT_FRAMES);
        } else if (this.movements.right) {
            this.animateSprite(1, MOVEMENT_FRAMES);
        } else if (this.movements.up) {
            this.animateSprite(2, MOVEMENT_FRAMES);
        } else if (this.movements.down) {
            this.animateSprite(0, MOVEMENT_FRAMES);
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
        let colX = this.x + this.width * 0.95 > o.x && this.x + this.width < o.x + o.width + this.width;
        let colY = this.y + this.height * 0.95 > o.y && this.y + this.height < o.y + o.height + this.height;
        return colX && colY;
    }

    damage(player) {
        for ( let i = 0; i < this.bullets.length; i++ ) {
            if (player.checkCollide(this.bullets[i])) {
                this.bullets.splice(i, 1)
                return true;
            } 
        }

        return false;
    }

    bulletCollisionWithObstacle(o) {
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].checkCollide(o)) {
                this.bullets.splice(i, 1)
            }
        }
    }
}