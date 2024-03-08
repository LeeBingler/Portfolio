import * as THREE from 'three';

export default class TouchTexture {
    constructor(width, height, maxAge, radius) {
        this.size = {
            width: width,
            height: height,
        };
        this.maxAge = maxAge;
        this.radius = radius;

        this.trail = [];

        this._initCanvas();
    }

    _easeOutSine(t, b, c, d) {
        return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
    }

    _initCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.size.width;
        this.canvas.height = this.size.height;
        this.ctx = this.canvas.getContext('2d');
        this._clearCanvas();

        this.texture = new THREE.Texture(this.canvas);

        this.canvas.id = 'touchTexture';

        this.canvas.style.width = `${this.canvas.width}px`;
        this.canvas.style.height = `${this.canvas.height}px`;
    }

    _clearCanvas() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.size.width, this.size.height);
    }

    _drawPoint(point) {
        const pos = {
            x: point.x * this.size.width,
            y: (1 - point.y) * this.size.height,
        };

        let intensity = 1;

        if (point.age < this.maxAge * 0.3) {
            intensity = this._easeOutSine(point.age / (this.maxAge * 0.3), 0, 1, 1);
        } else {
            intensity = this._easeOutSine(
                1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7),
                0,
                1,
                1
            );
        }

        intensity *= point.force;

        const radius = this.size.height * this.radius * intensity;
        const gradient = this.ctx.createRadialGradient(
            pos.x,
            pos.y,
            radius * 0.25,
            pos.x,
            pos.y,
            radius
        );

        gradient.addColorStop(0, `rgba(255, 255, 255, 1.0)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.0)');

        this.ctx.beginPath();
        this.ctx.fillStyle = gradient;
        this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    showCanvas() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.width = `${this.size.width * 4}px`;
        this.canvas.style.height = `${this.size.height * 4}px`;
        this.canvas.style.top = 0;
        this.canvas.style.left = 0;
        this.canvas.style.zIndex = 999;

        document.body.appendChild(this.canvas);
    }

    addTouch(point) {
        let force = 0;
        const last = this.trail[this.trail.length - 1];
        if (last) {
            const dx = last.x - point.x;
            const dy = last.y - point.y;
            const dd = dx * dx + dy * dy;
            force = Math.min(dd * 10000, 1);
        }
        this.trail.push({ x: point.x, y: point.y, age: 0, force });
    }

    update() {
        this._clearCanvas();

        // manage age of point
        for (let i = 0; i < this.trail.length; i++) {
            let point = this.trail[i];
            point.age++;

            // remove point too old
            if (point.age >= this.maxAge) {
                this.trail.splice(i, 1);
            }
        }

        // draw point
        for (let point of this.trail) {
            this._drawPoint(point);
        }

        this.texture.needsUpdate = true;
    }
}
