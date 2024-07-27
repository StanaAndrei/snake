import Snake from "./snake.js";

export const getKeyPressed = (p5context) => {
    const {
        LEFT_ARROW,
        RIGHT_ARROW,
        UP_ARROW, 
        DOWN_ARROW
    } = p5context;
    if (p5context.keyIsDown(LEFT_ARROW)) {
        return Snake.DIRS.LEFT
    } else if (p5context.keyIsDown(RIGHT_ARROW)) {
        return Snake.DIRS.RIGHT
    } else if (p5context.keyIsDown(UP_ARROW)) {
        return Snake.DIRS.UP
    } else if (p5context.keyIsDown(DOWN_ARROW)) {
        return Snake.DIRS.DOWN
    }
    return Snake.DIRS.NONE
}