import App from '../App.js';

import * as THREE from 'three';

import vertexShader from '../shaders/moon/vertex.glsl';
import fragmentShader from '../shaders/moon/fragment.glsl';

export default class Moon {
    constructor() {
        this.app = new App();
        this.resources = this.app.resources;
        this.camera = this.app.camera;
        this.debug = this.app.debug;

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Moon');
        }

        this._initGeo();
        this._initMat();
        this._initMoon();
    }

    _initGeo() {
        this.geometry = new THREE.SphereGeometry(13, 200, 200);
    }

    _initMat() {
        const uniforms = {
            uTime: new THREE.Uniform(0),

            uColorA: new THREE.Uniform(new THREE.Color('#9b1a1a')),
            uColorB: new THREE.Uniform(new THREE.Color('#ff7373')),
        };

        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
        });

        if (this.debug.active) {
            const debugParameter = {
                colorA: '#9b1a1a',
                colorB: '#ff7373',
            };
            this.debugFolder.addColor(debugParameter, 'colorA').onChange(() => {
                this.material.uniforms.uColorA.value.set(debugParameter.colorA);
            });

            this.debugFolder.addColor(debugParameter, 'colorB').onChange(() => {
                this.material.uniforms.uColorB.value.set(debugParameter.colorB);
            });
        }
    }

    _initMoon() {
        this.moon = new THREE.Mesh(this.geometry, this.material);
        this.moon.rotateX(Math.PI * 0.1);

        this.Plight = new THREE.PointLight(0xff4030, 2000, 150, 1.7);
        this.Plight.position.z += 1;

        this.instance = new THREE.Group();
        this.instance.add(this.moon, this.Plight);

        this.instance.position.set(0, 25, -70);
    }

    update(elapsedTime) {
        this.material.uniforms.uTime.value = elapsedTime * 0.1;

        this.Plight.position.y = 25 - 13 - 13 * 0.5 + Math.cos(elapsedTime * 2) * 3;
        this.Plight.position.z += Math.sin(elapsedTime * 100);
    }
}
