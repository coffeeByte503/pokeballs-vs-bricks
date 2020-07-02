import Entity, {
    obtainableBalls
} from "./Entity.js";
import {
    Vector,
    degToRad
} from "../Maths.js"
import {
    collider
} from "../engine/Collider.js"
import {
    bricks
} from "./Entity.js"
import {
    CANVAS_HEIGHT as CH,
    CANVAS_WIDTH as CW
} from "../const.js";

export default class Ball extends Entity {
    constructor(sprite, position, size, degrees) {
        super(position, size);

        this.vel = new Vector(Math.cos(degToRad(degrees)), -Math.sin(degToRad(degrees)));

        this.sprite = sprite;

        this.for = "game";


    }
    checkScreenColision() {
        if (this.right >= CW) {
            this.vel.x = -this.vel.x;
            this.right = CW;

        } else if (this.left <= 0) {
            this.vel.x = -this.vel.x;
            this.left = 0;
        }
        if (this.top <= 0) {
            this.vel.y = -this.vel.y;
            this.top = 0;
        } else if (this.bottom >= CH) {
            this.bottom = CH;
            this.vel.set(0, 0);
        }
    }
    update(dt) {
        const __this = this;
        this.movements.forEach(function (movement) {
            if (movement.update(dt)) {
                __this.movements.delete(movement);
            }
        });

        const x = this.vel.x * dt;
        const y = this.vel.y * dt


        const collision = collider(this, [...bricks, ...obtainableBalls], x, y);

        if (collision.side.x == "left" || collision.side.x == "right") {
            this.vel.x = -this.vel.x;
            if (this.for == "game") {
                collision.subjectCollide.life--;
            }

        }
        if (collision.side.y == "bottom" || collision.side.y == "top") {
            this.vel.y = -this.vel.y;
            if (this.for == "game") {
                collision.subjectCollide.life--;
            }

        }
        this.checkScreenColision();
        return this.bottom >= CH;

    }

    render(ctx) {

        ctx.drawImage(
            this.sprite,
            ...this.pos,
            ...this.size
        );
    }
}

export class ObtainableBall extends Ball {
    constructor(...args) {
        super(...args);
        this.name = "fakeBall";
        this.life = 1;
    }
    update(dt) {
        const __this = this;
        this.movements.forEach(function (movement) {
            if (movement.update(dt)) {
                __this.movements.delete(movement);
            }
        });

        return this.life === 0;
    };
    render(ctx) {
        ctx.drawImage(
            this.sprite,
            ...this.pos,
            ...this.size
        );
    }
}