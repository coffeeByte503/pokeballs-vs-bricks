import {
    EventEmitter
} from "../Util.js";

function getEase(currentProgress, start, distance, steps, power) {
    currentProgress /= steps / 2;

    if (currentProgress < 1) {
        return (distance / 2) * (Math.pow(currentProgress, power)) + start;
    }

    currentProgress -= 2;
    return distance / 2 * (Math.pow(currentProgress, power) + 2) + start;
}

export class MoveTo {
    constructor(entity, from, to) {

        this.entity = entity;

        this.to = to;

        this.from = from;

        this.frame = 0;

        this.frames = 50;

        this.events = new EventEmitter;
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

    update() {

        this.entity.pos.set(this.getX(), this.getY())

        if (this.frame < this.frames) {
            this.frame = this.frame + 1;
            return false;
        }
        this.events.emit("end");
        return true;
    }
}