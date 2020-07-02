import AbstractLoad from "../loads/AbstractLoad.js";

export default class AudioControler extends AbstractLoad {
    async decode() {
        for (let [key, buffer] of Object.entries(this.buffer)) {

            const audio = await AudioControler.decodeAudio(buffer, this.ctx);
            //save
            this.buffer[key] = audio;
        }
    }

    async play(name, loop = false, volume = 1) {
        if (!this.ctx) return;
        const buffer = this.buffer[name];
        const source = this.ctx.createBufferSource();

        source.volume = volume;
        source.connect(this.ctx.destination);
        source.buffer = buffer;

        source.loop = loop;

        source.start();
    }

    static async decodeAudio(buffer, ctx) {
        return ctx.decodeAudioData(buffer);
    }
}