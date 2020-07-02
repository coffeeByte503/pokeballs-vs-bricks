import {
    EventEmitter
} from "../Util.js";
import {
    MoveTo
} from "../engine/Movemets.js";
import {
    Vector
} from "../Maths.js"

export default class Entity {
    constructor(position, size) {
        this.sprite = null;
        this.pos = position;
        this.size = size;

        this.movements = new Set;
        this.traits = new Map();
        this.sprite = null;

        this.events = new EventEmitter;
    }
    get top() {
        return this.pos.y;
    }
    get bottom() {
        return this.pos.y + this.size.y;
    }

    get left() {
        return this.pos.x;
    }

    get right() {
        return this.pos.x + this.size.x;
    }

    set top(value) {
        this.pos.y = value;
    }

    set bottom(value) {
        this.pos.y = value - this.size.y;
    }

    set left(value) {
        this.pos.x = value;
    }

    set right(value) {
        this.pos.x = value - this.size.x;
    }

    get center() {
        return new Vector(this.pos.x + this.size.x / 2, this.pos.y + this.size.x / 2)
    }

    addMovement(Movement, ...args) {
        const movement = new Movement(this, ...args);
        this.movements.add(movement);
        return movement;
    }

    checkColision(entity) {

        return entity.right > this.left &&
            entity.left < this.right && entity.bottom > this.top &&
            entity.top < this.bottom
    }
    on(eventName, callback) {
        this.events.on(eventName, callback)
    }
    moveTo(x, y, onend = function () {}) {
        return new Promise(resolve => {
            const movement = this.addMovement(
                MoveTo,
                this.pos, new Vector(x || this.pos.x, y || this.pos.y)
            );
            movement.events.on("end", resolve);
            movement.events.on("end", onend);
        })

    }

    update() /*virtual*/ {}
    render() /*virtual*/ {}
}

export class EntityStore {
    constructor() {
        this.entities = [];

        this.events = new EventEmitter();

        this[Symbol.iterator] = function* () {
            for (let i = 0; i < this.entities.length; ++i) {
                yield this.entities[i];

            }
        }
    }

    add(entity) {
        this.events.emit("add");
        return this.entities.push(entity);
    }

    remove(index) {
        return this.entities.splice(index, 1);
    }

    delete(entity) {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            return this.entities.splice(index, 1);
        }
        return [];
    }

    clear() {
        this.entities = [];
    }

    filter(callback) {
        const arr = [];
        for (let entity of this.entities) {
            if (callback(entity)) arr.push(entity);
        }
        return arr;
    }

    get length() {
        return this.entities.length;
    }

}
export function entityRenderer(entityStore, ctx) {
    for (let entity of entityStore) {
        entity.render(ctx);
    }
}

export const bricks = new EntityStore();
export const balls = new EntityStore();
export const effects = new EntityStore();
export const obtainableBalls = new EntityStore();