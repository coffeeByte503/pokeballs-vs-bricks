export async function sleep(milis) {
    return new Promise(resolve => setTimeout(resolve, milis));
}

export async function launchFullScreen() {
    const element = document.documentElement;
    if (element.requestFullScreen) {
        element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
}

export const colors = [
    "#e91e63",
    "#673ab7",
    "#2196f3",
    "#009688",
    "#ff5722",
    "#607d8b",
];

export class EventEmitter {
    constructor() {
        this.events = {};
    }

    existEvent(type) {
        return typeof this.events[type] === 'object';
    }

    on(type, listener) {
        if (!this.existEvent(type)) {
            this.events[type] = [];
        }
        this.events[type].push(listener);
        return () => this.removeListener(type, listener);
    }

    removeListener(type, listener) {
        if (!this.existEvent(type)) return;

        const idx = this.events[type].indexOf(listener);
        if (idx > -1) {
            this.events[type].splice(idx, 1);
        }
    }

    emit(type, ...args) {
        if (!this.existEvent(type)) return;
        this.events[type].forEach(listener => listener(...args));
    }
}