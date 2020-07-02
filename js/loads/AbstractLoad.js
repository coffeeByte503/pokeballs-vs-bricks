import {
    getArrayBuffer
} from "./loadData.js";
import {
    EventEmitter
} from "../Util.js";
import {
    sum
} from "../Maths.js";
import {
    getHeaders
} from "../loads/loadData.js"

export default class AbstractLoad /*abstract*/ {
    constructor(src, ctx) {
        this.ctx = ctx;
        this.src = src;

        this.buffer = {};
        this.totalSize = 0;
        this.loaded = 0;
        this.events = new EventEmitter();


        this.events.on("progress", (src, loaded) => {

            src.loaded = loaded;
            this.updateState();
        })
    }
    async loadHeaders() {
        for (let name in this.src) {
            const url = this.src[name];

            const fileSize = Number(await getHeaders(url, "Content-Length"));

            this.src[name] = {
                url,
                size: fileSize,
                loaded: 0
            }

            this.totalSize += fileSize;

        }

    }

    async load() {
        const loads = [];
        const keys = [];
        let arrayBuffers = null;

        for (let [key, value] of Object.entries(this.src)) {
            loads.push(getArrayBuffer(value, this.events))
            keys.push(key);
        }
        arrayBuffers = await Promise.all(loads);

        //save
        arrayBuffers.forEach((buffer, i) => {
            this.buffer[keys[i]] = buffer;
        });
    }

    updateState() {
        this.loaded = sum(this.src, "loaded");
        this.events.emit("updateProgress", this.loaded, this.totalSize)
    }

    get(name) {
        return this.buffer[name];
    }

    decode() /*virtual*/ {}
}