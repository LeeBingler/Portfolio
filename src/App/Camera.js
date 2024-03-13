import * as THREE from 'three';
import gsap from 'gsap';
import  { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

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
        //this._setControl();
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

    _setControl() {
        this.controls = new FirstPersonControls(this.instance, this.canvas);
        this.controls.lookSpeed = 0.0001;
        this.controls.movementSpeed = 0.05;
        this.controls.constrainVertical = true;
        this.controls.verticalMin = Math.PI * 0.8;
        this.controls.verticalMax = Math.PI * -0.1;
    }

    onPointerMove() {
        /* TODO */
        /* Need to remove this for the final release */
        if (this.controls) return;

        
        /* TODO: Fix the rotation when we change scene*/
        /* We need to rotate from local axis and to add some edges */
/*
        let yRotation = -this.mouse.coordNormalize.x * 0.02;
        let xRotation = this.mouse.coordNormalize.y * 0.02;

        this.instance.rotateY(yRotation);
        this.instance.rotateX(xRotation);
*/
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update(deltaTime) {
        if (this.controls) {
            this.controls.update(deltaTime);
        }
    }
}
