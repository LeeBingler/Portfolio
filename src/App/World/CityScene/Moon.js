import App from '../../App.js';

import * as THREE from 'three';

import vertexShader from '../../shaders/moon/vertex.glsl';
import fragmentShader from '../../shaders/moon/fragment.glsl';

import haloVertexShader from '../../shaders/halo/vertex.glsl';
import haloFragmentShader from '../../shaders/halo/fragment.glsl';

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

        this.haloGeometry = new THREE.SphereGeometry(14.5);
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
            uniforms,
        });

        this.haloMaterial = new THREE.ShaderMaterial({
            fragmentShader: haloFragmentShader,
            vertexShader: haloVertexShader,
            transparent: true,
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

            this.debugFolder
                .add(this.material.uniforms.uFrequenceNoise, 'value')
                .min(1)
                .max(100)
                .step(0.1)
                .name('uFrequenceNoise');
            this.debugFolder
                .add(this.material.uniforms.uStrengthDisplacement, 'value')
                .min(0)
                .max(2)
                .step(0.001)
                .name('uStrengthDisplacement');
        }
    }

    _initMoon() {
        this.moon = new THREE.Mesh(this.geometry, this.material);
        this.moon.rotateX(Math.PI * 0.1);

        this.halo = new THREE.Mesh(this.haloGeometry, this.haloMaterial);

        this.instance = new THREE.Group();
        this.instance.add(this.moon, this.halo);

        this.instance.position.set(0, 25, -70);
    }

    update(elapsedTime) {
        this.material.uniforms.uTime.value = elapsedTime * 0.1;
    }
}
