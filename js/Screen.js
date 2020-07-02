import {
    CANVAS_WIDTH as CW,
    CANVAS_HEIGHT as CH
} from "./const.js";
import {
    Vector
} from "./Maths.js";
import {
    EventEmitter
} from "./Util.js"



export function createScreen(w = CW, h = CH) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;

    const context = canvas.getContext("2d");

    return {
        canvas,
        context,
        drawSelf: function (sprite, pos = new Vector, size = new Vector) {
            context.drawImage(sprite, ...pos, ...size)
        }
    };
}

export function appendScreens(screens, target) {
    screens.forEach(screen => {
        target.appendChild(screen.canvas);
    });
}

export function isMobile() {
    return (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i));
}