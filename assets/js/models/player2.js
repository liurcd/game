class Player2 extends Player1{
    constructor(ctx, x, y) {
        super(ctx, x, y)

        this.sprite.src = './assets/img/squirel.sprite.png';
    }
    
    onKeyEvent(event) {
        const status = event.type === 'keydown';
        switch (event.keyCode) {
          case P2_KEY_UP:
            this.movements.up = status;
            this.direction = "up";
            break;
          case P2_KEY_DOWN:
            this.movements.down = status;
            this.direction = "down";
            break;
          case P2_KEY_RIGHT:
            this.movements.right = status;
            this.direction = "right";
            break;
          case P2_KEY_LEFT:
            this.movements.left = status;
            this.direction = "left";
            break;
          case P2_KEY_ATTACK:
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
                  this.bullets.push(new Attack(this.ctx, attackX, attackY, this.direction, './assets/img/nube.sprite.png'));
                  this.canFire = false;
                  setTimeout(() => this.canFire = true, 500);
              }
              break;
          }
    }
}