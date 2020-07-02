export const side = {
    left: Symbol("left"),
    right: Symbol("right"),

    top: Symbol("top"),
    bottom: Symbol("bottom")
}
export function overlap(a, b) {
    return a.bottom > b.top &&
        a.top < b.bottom &&
        a.right > b.left &&
        a.left < b.right;
}
export function intersection(subject, obstacles, func) {
    obstacles.filter(obstacle => overlap(subject, obstacle)).forEach(func);
}

export function clickCollision(object, clickX, clickY) {
    return clickX >= object.left &&
        clickX <= object.right &&
        clickY >= object.top &&
        clickY <= object.bottom;
}


export function collider(subject, arr, x, y) {
    let side = {
        x: "",
        y: ""
    };
    let subjectCollide = null;

    subject.pos.x += x;
    if (x > 0) {
        intersection(subject, arr, rect => {
            if (subject.right > rect.left) {
                subject.right = rect.left;
                side.x = "right";
                subjectCollide = rect;
            }
        });
    } else if (x < 0) {
        intersection(subject, arr, rect => {
            if (subject.left < rect.right) {
                subject.left = rect.right;
                side.x = "left";
                subjectCollide = rect;
            }
        });
    }
    subject.pos.y += y;
    if (y > 0) {
        intersection(subject, arr, rect => {
            if (subject.bottom > rect.top) {
                subject.bottom = rect.top;
                side.y = "bottom";
                subjectCollide = rect;
            }
        });
    } else if (y < 0) {
        intersection(subject, arr, rect => {
            if (subject.top < rect.bottom) {
                subject.top = rect.bottom;
                side.y = "top";
                subjectCollide = rect;
            }
        });
    }
    return {
        side,
        subjectCollide
    };
}