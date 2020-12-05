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
            break;
          case P2_KEY_DOWN:
            this.movements.down = status;
            break;
          case P2_KEY_RIGHT:
            this.movements.right = status;
            break;
          case P2_KEY_LEFT:
            this.movements.left = status;
            break;
        }
    }
}