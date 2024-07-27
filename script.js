import "https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js";
import Snake from "./snake.js";
import Food from "./food.js";
import { syncSleep } from "./utils.js";

const canvasDad = document.querySelector('#canvasDad');
let snake, food;

const initP5 = p5context => {
    const handleInput = () => {
        const {
            LEFT_ARROW,
            RIGHT_ARROW,
            UP_ARROW, 
            DOWN_ARROW
        } = p5context;
        if (p5context.keyIsDown(LEFT_ARROW)) {
            snake.changeDir(Snake.DIRS.LEFT);
        } else if (p5context.keyIsDown(RIGHT_ARROW)) {
            snake.changeDir(Snake.DIRS.RIGHT);
        } else if (p5context.keyIsDown(UP_ARROW)) {
            snake.changeDir(Snake.DIRS.UP);
        } else if (p5context.keyIsDown(DOWN_ARROW)) {
            snake.changeDir(Snake.DIRS.DOWN);
        }
    }

    p5context.setup = () => {
        p5context.createCanvas(window.innerWidth - 150, window.innerHeight - 150);
        window.focus();
        snake = new Snake(p5context.width / 2, p5context.height / 2, 2, p5context);
        food = new Food(p5context);
        food.setPos();
    };
    p5context.draw = () => {
        p5context.background(20);
        if (snake.checkDead()) {
            p5context.textSize(100);
            p5context.fill(0, 102, 153);
            p5context.text('YOU LOST!', p5context.width / 3, p5context.height / 2);
            return;
        }
        snake.update(food);
        snake.draw(p5context);
        food.draw();//*/
        handleInput();
        syncSleep(50);
    }
}

new p5(initP5, canvasDad);