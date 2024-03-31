import App from '../../App.js';

import * as THREE from 'three';
import gsap from 'gsap';

import vertexShader from '../../shaders/moon/vertex.glsl';
import fragmentShader from '../../shaders/moon/fragment.glsl';

import haloVertexShader from '../../shaders/halo/vertex.glsl';
import haloFragmentShader from '../../shaders/halo/fragment.glsl';

export default class Moon {
    constructor() {
        this.app = new App();
        this.resources = this.app.resources;
        this.camera = this.app.camera;
        this.raycaster = this.app.raycaster;
        this.mouse = this.app.mouse;
        this.debug = this.app.debug;

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Moon');
        }

        this._initGeo();
        this._initMat();
        this._initMoon();
        this._initAnim();

        // Make the raycaster detect the moon
        this.raycaster.pushToTestIntersect(this.moon, 'moon');

        this.mouse.on('click', () => {
            this.clickMoon();
        });
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

            uColorA: new THREE.Uniform(new THREE.Color('#630303')),
            uColorB: new THREE.Uniform(new THREE.Color('#ed333b')),

        };

        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            fog: true,
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib['fog'],
                uniforms
            ]),
        });

        this.haloMaterial = new THREE.ShaderMaterial({
            fragmentShader: haloFragmentShader,
            vertexShader: haloVertexShader,
            transparent: true,
            depthWrite: false
        });

        if (this.debug.active) {
            const debugParameter = {
                colorA: '#630303',
                colorB: '#ed333b',
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

    _initAnim() {
        this.animation = gsap.timeline({paused: true});
        this.animation.to(this.material.uniforms.uColorB.value, {
            g: 0.3,
            duration: 0.5,
            ease: 'none'
        });
        this.animation.to(this.material.uniforms.uColorB.value, {
            g: 0.02,
            duration: 0.5,
            ease: 'none',
        });
    }

    clickMoon() {
        const intersect = this.raycaster.getItemIntersect(this.moon.uuid);
        if (intersect) {
            this.animation.seek(0);
            this.animation.play();
        }
    }

    update(elapsedTime) {
        this.material.uniforms.uTime.value = elapsedTime * 0.1;
    }
}
