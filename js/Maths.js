export function random(min, max, fixed = 0) {
    return Number((Math.random() * (max - min) + min).toFixed(fixed))
}

export function degToRad(degs) {
    return (Math.PI / 180) * degs;
}

export function radToDeg(rad) {
    return rad * (180 / Math.PI)
}

export function sum(target, property) {
    let sum = 0;
    for (let name in target) {
        sum += Number(target[name][property]);
    }
    return sum;
}

export function toMB(b, fixed = 0) {
    return (b / 1048576).toFixed(fixed);
}

export class Vector {
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

export class Percentage {
    constructor(maxValue = 0) {
        this.maxValue = maxValue;
    }
    getPercent(value, fixed = 0) {
        return ((100 / this.maxValue) * value).toFixed(fixed);
    }
}