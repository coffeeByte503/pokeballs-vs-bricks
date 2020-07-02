import Entity from "./Entity.js"
import {
    Vector,
    random
} from "../Maths.js";

export default class Brick extends Entity {
    constructor(color, position, size, life = 10) {
        super(new Vector(position.x * size.x, position.y * size.y), size);

        this.life = life;
        this.originalLife = life;

        this.color = color;
        this.name = "brick";
    }

    update(dt) {
        const __this = this;
        this.movements.forEach(function (movement) {
            if (movement.update(dt)) {
                __this.movements.delete(movement);
            }
        });
    }

    render(ctx) {
        ctx.save();

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#fff"
        ctx.rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText(this.life, this.left + this.size.x / 2, this.top + this.size.y / 2);

        ctx.restore();
    }
}

export class Treasure extends Brick {
    constructor(...args) {
        super(...args);
        this.name = "treasure";
    }
    render(ctx) {
        ctx.drawImage(this.color, ...this.pos, ...this.size);
        ctx.save();
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText(this.life, this.center.x, this.center.y + 20);
        ctx.restore();
    }
}