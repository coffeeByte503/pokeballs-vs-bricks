import {
    EventEmitter
} from "../Util.js";
import {
    sum
} from "../Maths.js"

export default class LoadManager {
    constructor(loaders) {
        this.loaders = loaders;

        this.loaded = 0;
        this.events = new EventEmitter();
        LoadManager.assignProgressEvent(loaders, () => this.updateState())

    }

    static assignProgressEvent(loaders, event) {
        loaders.forEach(loader => {
            loader.events.on("progress", event);
        })
    }

    async calcTotalSize() {
        let total = 0;
        for (let loader of this.loaders) {
            total += loader.totalSize
        }
        return total;
    }

    updateState() {
        this.loaded = sum(this.loaders, "loaded")
        this.events.emit("progress", this.loaded, this.totalSize)

    }

    async load() {
        this.events.emit("loadstart");
        for (let loader of this.loaders) {
            loader.totalSize = (1048576 * 2.59) / 2;
            this.totalSize = await this.calcTotalSize()
        }

        for (let loader of this.loaders) {
            this.totalSize = await this.calcTotalSize()
            await loader.load();
        }

        this.events.emit("decoding");

        for (let loader of this.loaders) {
            await loader.decode();
        }

        this.events.emit("decoded");
    }

}
            this.totalSize = await this.calcTotalSize()
        }

        for (let loader of this.loaders) {
            this.totalSize = await this.calcTotalSize()
            await loader.load();
        }

        this.events.emit("decoding");

        for (let loader of this.loaders) {
            await loader.decode();
        }

        this.events.emit("decoded");
    }

}
