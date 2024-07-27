import "https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js";
import Snake from "./snake.js";
import Food from "./food.js";
import { syncSleep } from "./utils.js";
import { getKeyPressed } from "./input-handler.js";

new p5(p5context => {
    let snake, food;
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
        snake.changeDir(getKeyPressed(p5context));
        syncSleep(50);
    }
}, document.querySelector('#canvasDad'));