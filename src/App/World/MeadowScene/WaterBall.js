import App from '../../App.js';

import * as THREE from 'three';

import vertexShader from '../../shaders/waterBall/vertex.glsl';
import fragmentShader from '../../shaders/waterBall/fragment.glsl';

export default class WaterBall {
    constructor() {
        this.app = new App();
        this.resources = this.app.resources;
        this.camera = this.app.camera;
        this.mouse = this.app.mouse;
        this.debug = this.app.debug;

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('WaterBall');
        }

        this._initGeo();
        this._initMat();
        this._initWaterBall();
    }

    _initGeo() {
        this.geometry = new THREE.SphereGeometry(13, 200, 200);
    }

    _initMat() {
        const uniforms = {
            uTime: new THREE.Uniform(0),

            uFrequenceNoise: new THREE.Uniform(10),
            uStrengthDisplacement: new THREE.Uniform(0.526),

            uColorA: new THREE.Uniform(new THREE.Color('#9b1a1a')),
            uColorB: new THREE.Uniform(new THREE.Color('#ff7373')),

        };

        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: uniforms
        });
    }

    _initWaterBall() {
        this.waterBall = new THREE.Mesh(this.geometry, this.material);

        this.instance = new THREE.Group();
        this.instance.add(this.waterBall);

        this.instance.position.set(0, 25, -70);
    }

    update(elapsedTime) {
        this.material.uniforms.uTime.value = elapsedTime * 0.1;
    }
}
