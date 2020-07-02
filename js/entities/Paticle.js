import {
    random,
    Vector,
    degToRad
} from "../Maths.js";
import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT
} from "../const.js";
import {
    EntityStore,
    entityRenderer
} from "./Entity.js";

export class DestroyEffect {
    constructor(brick) {
        this.particles = new EntityStore();
        for (let i = 0; i < random(100, 200); ++i) {
            this.particles.add(new Particle(brick.color, ...brick.center))
        }
    }

    update(dt) {
        for (let particle of this.particles) {
            if (particle.update(dt)) this.particles.delete(particle)
        }
        return this.particles.size == 0;
    }
    render(ctx) {
        entityRenderer(this.particles, ctx)
    }
}
export class Particle {
    constructor(color, x, y) {
        const colors = [color]
        this.scale = 1.0;
        this.pos = new Vector(x, y);
        this.radius = random(10, 15);
        this.color = colors[random(0, colors.length - 1)];
        this.vel = new Vector(random(-0.1, 0.1, 3), random(-0.1, 0.1, 3));
        this.scaleSpeed = random(0, 0.0007, 5);

        this.degs = random(0, 100, 2)
        this.rotationSpeed = random(1, 3, 2);

        this.opacity = random(0.7, 1, 2);
        this.opacitySpeed = random(0.002, 0.006, 4);

    }
    update(dt) {
        this.scale -= this.scaleSpeed * dt;
        this.degs += this.rotationSpeed;
        this.rotationSpeed -= 0.01;
        this.opacity -= this.opacitySpeed;

        if (this.scale <= 0) this.scale = 0;

        this.pos.x += this.vel.x * dt;
        this.pos.y += this.vel.y * dt;

        return this.scale == 0 || this.pos.x < 0 || this.pos.x > CANVAS_WIDTH ||
            this.pos.y < 0 || this.pos.y > CANVAS_HEIGHT || this.opacity <= 0;
    }
    render(ctx) {
        ctx.save()

        ctx.globalAlpha = this.opacity;

        ctx.translate(...this.pos);
        ctx.rotate(-degToRad(this.degs));
        ctx.translate(-this.radius / 2, -this.radius / 2);
        ctx.scale(this.scale, this.scale);

        if (this.sprite) {
            ctx.drawImage(this.sprite, 0, 0, this.radius, this.radius)
        } else {
            ctx.beginPath();

            ctx.lineWidth = 1;
            ctx.strokeStyle = "#fff"
            ctx.rect(0, 0, this.radius, this.radius)
            ctx.stroke();

            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }

        ctx.restore();
    }

}