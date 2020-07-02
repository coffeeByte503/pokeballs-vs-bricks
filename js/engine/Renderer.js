export default class Renderer {
    constructor(callback) {

        this.lt = 0;
        this.dt = 0;
        this.request;
        this.running = false;
        this.minFPS = 5;
        this.update = ms => {
            this.dt = ms - this.lt;

            if (this.running && ms && (1000 / this.dt | 0) > this.minFPS) callback(this.dt);

            this.lt = ms;
            this.request = requestAnimationFrame(this.update);
        }
    }
    stop() {
        if (!this.running) return;
        cancelAnimationFrame(this.request);
        delete this.request;
        this.running = false;
    }

    pause() {
        this.running = false;
    }

    continue () {
        this.running = true;
    }

    start() {
        if (this.running) return;
        this.running = true;
        this.request = requestAnimationFrame(this.update);
    }
}