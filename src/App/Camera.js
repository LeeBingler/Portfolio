import * as THREE from 'three';
import gsap from 'gsap';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

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

        this.oldx = 0;
        this.oldy = 0;

        this._setInstance();
        this._setOrthographic();
    }

    _setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            45,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        );
        this.instance.rotation.x = Math.PI * 0.07;
    }

    _setOrthographic() {
        this.orthographic = new THREE.OrthographicCamera(
            this.sizes.width / -2,
            this.sizes.width / 2,
            this.sizes.height / 2,
            this.sizes.height / -2,
            -10,
            10
        );
        this.scene.add(this.orthographic);
    }

    _setControl() {
        this.controls = new FirstPersonControls(this.instance, this.canvas);
        this.controls.lookSpeed = 0.0001;
        this.controls.movementSpeed = 0.05;
        this.controls.constrainVertical = true;
        this.controls.verticalMin = Math.PI * 0.8;
        this.controls.verticalMax = Math.PI * -0.1;
    }

    onPointerMove(deltaTime) {
        let parralaxX = this.mouse.coordNormalize.x - this.oldx;
        let parralaxY = this.mouse.coordNormalize.y - this.oldy;

        this.instance.translateX(parralaxX * deltaTime * 0.01);
        this.instance.translateY(parralaxY * deltaTime * 0.01);

        this.oldx = this.mouse.coordNormalize.x;
        this.oldy = this.mouse.coordNormalize.y;
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();

        this.orthographic.left = this.sizes.width / -2;
        this.orthographic.right = this.sizes.width / 2;
        this.orthographic.top = this.sizes.height / 2;
        this.orthographic.bottom = this.sizes.height / -2;
        this.orthographic.updateProjectionMatrix();
    }
}
