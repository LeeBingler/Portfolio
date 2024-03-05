import * as THREE from 'three';

import App from '../App';

import vertexShader from '../shaders/stars/vertex.glsl';
import fragmentShader from '../shaders/stars/fragment.glsl';

export default class Stars {
    constructor(numberStars = 1000) {
        this.app = new App();
        this.debug = this.app.debug;

        this.numberStars = numberStars;

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Stars');
        }

        this._initGeo();
        this._initMat();
        this._initStars();
    }

    _initGeo() {
        const arrayPositions = new Float32Array(this.numberStars * 3);
        const randomScale = new Float32Array(this.numberStars);

        for (let i = 0; i < this.numberStars; i++) {
            const i3 = i * 3;

            arrayPositions[i3] = Math.random() * 300;
            arrayPositions[i3 + 1] = Math.random();
            arrayPositions[i3 + 2] = Math.random() * 150;

            randomScale[i] = 0.3 + Math.random();
        }

        this.geometry = new THREE.BufferGeometry();

        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(arrayPositions, 3));
        this.geometry.setAttribute('aRandomScale', new THREE.Float32BufferAttribute(randomScale, 1));
    }

    _initMat() {
        const uniforms = {
            uTime: new THREE.Uniform(0),

            uSize: new THREE.Uniform(400),
            uColor: new THREE.Uniform(new THREE.Color('#ffe1e1')),
        };

        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            uniforms,
        });

        if (this.debug.active) {
            const debugParameter = {
                color: '#ffe1e1',
            };
            this.debugFolder.addColor(debugParameter, 'color').onChange(() => {
                this.material.uniforms.uColor.value.set(debugParameter.color);
            });

            this.debugFolder
                .add(this.material.uniforms.uSize, 'value')
                .min(0)
                .max(1000)
                .step(0.01)
                .name('size');
        }
    }

    _initStars() {
        this.instance = new THREE.Points(this.geometry, this.material);
        this.instance.position.set(-100, 33, -150);
    }

    update(elapsedTime) {
        this.material.uniforms.uTime.value = elapsedTime * 0.1;
    }
}
