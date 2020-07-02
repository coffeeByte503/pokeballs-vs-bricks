let card = null,
    ctx = null,
    cv = null;

async function main() {

    cv = self.canvas;

    ctx = cv.getContext("2d");

    const heart_13 = self.heart_13;

    card = new Card("heart 13", heart_13);
    card.pos.set(20, 20);
    card.size.set(100, 128);
    card.addMovement(
        MoveTo,
        card.pos, new Vec2(100, 100)
    );

    renderer();


}
window.onload = main;

function renderer() {

    ctx.clearRect(0, 0, cv.width, cv.height);

    card.render(ctx);
    card.update(1);

    requestAnimationFrame(renderer);
}


function getEase(currentProgress, start, distance, steps, power) {
    currentProgress /= steps / 2;

    if (currentProgress < 1) {
        return (distance / 2) * (Math.pow(currentProgress, power)) + start;
    }

    currentProgress -= 2;
    return distance / 2 * (Math.pow(currentProgress, power) + 2) + start;
}

class MoveTo {
    constructor(entity, from, to) {

        this.entity = entity;

        this.to = to;

        this.from = from;

        this.frame = 0;

        this.frames = 100;
    }

    getX() {

        let distance = this.to.x - this.from.x;
        let steps = this.frames;
        let currentProgress = this.frame;

        return getEase(currentProgress, this.from.x, distance, steps, 3);
    }

    getY() {
        let distance = this.to.y - this.from.y;
        let steps = this.frames;
        let currentProgress = this.frame;

        return getEase(currentProgress, this.from.y, distance, steps, 3);
    }

    update(dt) {


        this.entity.pos.set(this.getX(), this.getY())

        if (this.frame < this.frames) {
            this.frame = this.frame + 1;
            return false;
        } else {
            return true;
        }
    }
}


class Vec2 {
    constructor(x = 0, y = 0) {
        this.set(x, y);

        this[Symbol.iterator] = function* () {
            yield this.x;
            yield this.y;
        }
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}

//abstract
class Entity {
    constructor(sprite) {
        this.sprite = sprite;

        this.pos = new Vec2;
        this.vel = new Vec2;
        this.size = new Vec2(32, 32);

        this.movements = new Set;
    }

    addMovement(Movement, ...args) {
        this.movements.add(new Movement(this, ...args));
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
        ctx.drawImage(this.sprite, ...this.pos, ...this.size);
    }
}

class Card extends Entity {
    constructor(name, sprite) {
        super(sprite);
        this.name = name;
    }
}