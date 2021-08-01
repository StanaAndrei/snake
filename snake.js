import Food from "./food.js";

const bodyPartLen = 30;//this is global to be used in constructor
export default class Snake {
    constructor(x, y, len, p5context) {
        this.x = x;
        this.y = y;
        this.p5context = p5context;
        this.dir = Snake.DIRS.RIGHT;
        this.body = [];
        for (let by = y; by > y - bodyPartLen * len; by -= bodyPartLen) {
            this.body.push({
                x: x,
                y: by,
            });
        }//*/
    }
    static get DIRS() {
        const dirs = {
            LEFT: 1,
            RIGHT: 2,
            UP: 3,
            DOWN: 4,
        };
        return dirs;
    }
    changeDir(dir) {
        switch (dir) {
            case Snake.DIRS.LEFT:
                if (this.dir !== Snake.DIRS.RIGHT) {
                    this.dir = dir;
                }
                break;
            case Snake.DIRS.RIGHT:
                if (this.dir !== Snake.DIRS.LEFT) {
                    this.dir = dir;
                }
                break;
            case Snake.DIRS.UP:
                if (this.dir !== Snake.DIRS.DOWN) {
                    this.dir = dir;
                }
                break;
            case Snake.DIRS.DOWN:
                if (this.dir !== Snake.DIRS.UP) {
                    this.dir = dir;
                }
                break;
        }
    }
    draw() {
        for (let bodyPart of this.body) {
            this.p5context.square(bodyPart.x, bodyPart.y, bodyPartLen);
        }
    }
    update(food) {
        const speed = this.p5context.width * 1.3 / 100;
        const dirDeltas = new Map([
            [Snake.DIRS.LEFT, { x: -speed, y: 0 }],
            [Snake.DIRS.RIGHT, { x: speed, y: 0 }],
            [Snake.DIRS.UP, { x: 0, y: -speed }],
            [Snake.DIRS.DOWN, { x: 0, y: speed }],
        ]);
        this.x += dirDeltas.get(this.dir).x;
        this.y += dirDeltas.get(this.dir).y;
        this.body.push({
            x: this.x,
            y: this.y,
        });
        if (!this.#checkFeed(food)) {
            this.body.shift();
        } else {
            food.setPos();
        }
    }
    #checkFeed(food) {
        const { midX, midY } = this.#getMid();
        return (midX - food.x) * (midX - food.x) + (midY - food.y) * (midY - food.y) <= Food.RADIUS * Food.RADIUS;//*/
    }
    checkDead() {
        const { width, height } = this.p5context;
        if (!(this.x >= 0 && this.y >= 0 && this.x <= width && this.y <= height)) {
            return true;
        }
        return false;
    }
    #getMid() {
        const { x, y } = this;
        const midX = x + bodyPartLen / 2;
        const midY = y + bodyPartLen / 2;
        return { midX, midY };
    }
}