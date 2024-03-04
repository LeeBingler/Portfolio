import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import App from './App';

export default class Camera {
    constructor() {
        this.app = new App();
        this.time = this.app.time;
        this.sizes = this.app.sizes;
        this.canvas = this.app.canvas;
        this.scene = this.app.scene;
        this.mouse = this.app.mouse;
        this.debug = this.app.debug;

        this.controls = null;

        this._setInstance();
        this._setMoveCamera();
    }

    _setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            45,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        );
        this.instance.rotation.x = Math.PI * 0.07;

        this.scene.add(this.instance);
    }

    _setMoveCamera() {
        this.mouse.on('pointermove', () => {
            gsap.to(this.instance.rotation, {
                y: -this.mouse.coordNormalize.x * 0.02,
                x: (this.mouse.coordNormalize.y * 0.02) + Math.PI * 0.07,
            });
        });
    }

    _setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {
        if (this.controls) {
            this.controls.update();
        }
    }
}
