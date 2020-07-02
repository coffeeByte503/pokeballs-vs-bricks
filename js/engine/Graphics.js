import AbstractLoad from "../loads/AbstractLoad.js";

export default class Graphics extends AbstractLoad {
    async decode() {
        for (let [key, buffer] of Object.entries(this.buffer)) {
            const img = await Graphics.decodeImage(buffer);
            this.buffer[key] = img;
        }
    }

    draw(name, pos, size) {
        this.ctx.drawImage(this.buffer[name], ...pos, ...size);
    }

    drawOn(name, ctx, pos, size) {
        ctx.drawImage(this.buffer[name], ...pos, ...size);
    }

    static decodeImage(arrayBuffer) {
        return new Promise(resolve => {
            const img = new Image();
            const blob = new Blob([arrayBuffer]);
            const url = window.URL.createObjectURL(blob);
            img.onload = () => resolve(img);
            img.src = url;
        })
    }
}