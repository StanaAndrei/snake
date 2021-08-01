import "https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js";
import Snake from "./snake.js";
import Food from "./food.js";
const canvasDad = document.querySelector('#canvasDad');
let snake, food;

const syncSleep = (waitTime) => {
    let startDate = new Date(), currDate = null;
    do {
        currDate = new Date();
    } while (currDate - startDate < waitTime);
};

const initP5 = p5context => {
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
        syncSleep(50);
    }
    p5context.keyPressed = () => {
        const {
            LEFT_ARROW,
            RIGHT_ARROW,
            UP_ARROW, 
            DOWN_ARROW
        } = p5context;

        switch (p5context.keyCode) {
            case LEFT_ARROW:
                snake.changeDir(Snake.DIRS.LEFT);
                break;
            case RIGHT_ARROW:
                snake.changeDir(Snake.DIRS.RIGHT);
                break;
            case UP_ARROW:
                snake.changeDir(Snake.DIRS.UP);
                break;
            case DOWN_ARROW:
                snake.changeDir(Snake.DIRS.DOWN);
                break;
        }
    }
}

new p5(initP5, canvasDad);