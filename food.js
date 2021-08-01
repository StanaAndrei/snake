export default class Food {
    constructor(p5context) {
        this.p5context = p5context;
    }
    static get RADIUS() {
        return 20;
    }
    setPos() {
        const { width, height } = this.p5context;
        this.x = Math.floor(Math.random() * width);
        this.y = Math.floor(Math.random() * height);
    }
    draw() {
        this.p5context.push();
        this.p5context.fill('red');
        this.p5context.circle(this.x, this.y, Food.RADIUS);
        this.p5context.pop();
    }
}