import Food from "./food.js";

const bodyPartLen = 20;//this is global to be used in constructor
export default class Snake {
    #firstCheck = true;
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
        const speed = bodyPartLen;
        const dirDeltas = new Map([
            [Snake.DIRS.LEFT, { x: -speed, y: 0 }],
            [Snake.DIRS.RIGHT, { x: speed, y: 0 }],
            [Snake.DIRS.UP, { x: 0, y: -speed }],
            [Snake.DIRS.DOWN, { x: 0, y: speed }],
        ]);
        this.x += dirDeltas.get(this.dir).x;
        this.y += dirDeltas.get(this.dir).y;
        this.body.splice(0, 0, {
            x: this.x,
            y: this.y,
        });
        if (!this.#checkFeed(food)) {
            this.body.pop();
        } else {
            food.setPos();
        }
    }
    #checkFeed(food) {
        const { midX, midY } = this.#getBodyPartMid(this);
        return (midX - food.x) * (midX - food.x) + (midY - food.y) * (midY - food.y) <= Food.RADIUS * Food.RADIUS;//*/
    }
    checkDead() {
        const { width, height } = this.p5context;
        const {midX: headMidX, midY: headMidY} = this.#getBodyPartMid(this);
        if (!(headMidX >= 0 && headMidY >= 0 && headMidX <= width && headMidY <= height)) {
            return true;
        }
        const {body} = this;
        //console.log('head:', headMidX, headMidY)
        if (this.#firstCheck) {
            this.#firstCheck = false;
            return;
        }
        for (let i = 1; i < body.length; i++) {
            const {midX, midY} = this.#getBodyPartMid(body[i]);
            //console.log('part:', midX, midY)
            if (midX === headMidX && midY === headMidY) {
                return true;
            }
        }
        return false;
    }
    #getBodyPartMid({x, y}) {
        const midX = x + bodyPartLen / 2;
        const midY = y + bodyPartLen / 2;
        return { midX, midY };
    }
}