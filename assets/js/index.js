window.addEventListener('load', () => {
    const game = new Game('canvas');

    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event);
    });

    document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event);
    });

    document.addEventListener('keypress', (event) => {
        game.start();
    });
});