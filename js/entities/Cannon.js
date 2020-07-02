import Entity, {
    balls
} from "./Entity.js";
import {
    Vector,
    degToRad,
    random
} from "../Maths.js";

import Ball from "./Ball.js";
import {
    sleep
} from "../Util.js";
import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT
} from "../const.js";

function alert(info, time) {
    const container = document.createElement("div");
    container.classList.add("alert");
    container.innerHTML = info;
    document.body.appendChild(container);
    setTimeout(() => {
        container.remove()
    }, time);
}
export default class Cannon extends Entity {
    constructor(sprite) {
        const size = new Vector(50, 50);
        const pos = new Vector(300 / 2 - size.x / 2, 500 - size.y);
        super(pos, size);
        this.sprite = sprite;
        this.degs = 90;

        this.balls = 1;
        this.ballSprite = null;
        this.trCtx = null;
        this.score = 0;
        this.coins = 0;

        this.nextObtainableBall = 2;
        this.fireCount = 0;

        this.inGame = false;

    }

    addScore(value) {
        this.score += value;
        this.events.emit("scoreChange");

    }

    addBall() {
        const ball = new Ball(
            this.ballSprite,
            new Vector(this.pos.x + 16, this.bottom - this.size.y / 2 - 16 / 2),
            new Vector(16, 16),
            this.degs
        );
        balls.add(ball);
    }

    addCoins(value) {
        this.coins += value;
        this.events.emit("coinsChange");
    }

    static async whatchBalls() {
        while (balls.length != 0) {
            await sleep(100);
        }
        return true;
    }

    static calcTrajectory(ctx, cannon, trWidth) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        const ball = new Ball(
            cannon.ballSprite,
            new Vector(cannon.pos.x + 16, cannon.bottom - cannon.size.y / 2 - 16 / 2),
            new Vector(16, 16),
            cannon.degs
        );
        ball.for = "trajectory"
        for (let i = 0; i <= trWidth; ++i) {
            if (i <= 3) continue;
            ball.update((i * 10) - (i ? (i - 1) * 10 : 0))
            if (i % 3 === 0) ball.render(ctx);

        }
    }
    addBalls(value) {
        this.balls += value;
        this.events.emit("ballChange")
    }

    async fire() {


        if (this.inGame) {
            alert("wait for balls", 1000)
            return;
        }
        this.inGame = true;
        this.fireCount++;
        this.events.emit("fire");
        for (let i = 0; i < this.balls; ++i) {
            this.addBall()
            this.events.emit("ballSpawn");
            await sleep(100);
        }
        await Cannon.whatchBalls();
        this.events.emit("canMove");
        await this.moveTo(random(this.size.x, 300 - this.size.x));
        Cannon.calcTrajectory(this.trCtx, this, 40);
        this.events.emit("moveEnd");
        this.inGame = false;

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
        ctx.translate(this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
        ctx.rotate(-degToRad(this.degs));
        ctx.translate(-this.pos.x - this.size.x / 2, -this.pos.y - this.size.y / 2);
        ctx.drawImage(this.sprite, this.pos.x, this.pos.y, this.size.x, this.size.y);
        ctx.restore();

    }

    setDegs(degs) {
        this.degs = degs;
        this.events.emit("changeDegs");
    }
}