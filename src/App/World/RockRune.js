import * as THREE from "three";
import gsap from "gsap";

import App from "../App.js";

import vertexShader from "../shaders/rockparticles/vertex.glsl";
import fragmentShader from "../shaders/rockparticles/fragment.glsl";

export default class Rockrune {
    constructor(rock) {
        this.model = rock;
        this.color = new THREE.Color('#white');

        this.app = new App();
        this.sizes = this.app.sizes;
        this.raycaster = this.app.raycaster;
        this.raycaster.pushToTestIntersect(this.model, 'rockrune');
    }

    _createParticle() {
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            uniforms: {
                uTime: new THREE.Uniform(0),

                uSize: new THREE.Uniform(1),
                uResolution: new THREE.Uniform(this.sizes.resolution),
                uColor: new THREE.Uniform(this.color),
                uProgress: new THREE.Uniform(0),
            }
        });

        const COUNT_PART = 10;
        const geometry = new THREE.BufferGeometry();
        
        const position = new Float32Array(COUNT_PART * 3);
        const randomScale = new Float32Array(COUNT_PART);
        const timeMultiplier = new Float32Array(COUNT_PART);

        for (let i = 0; i < COUNT_PART; i++) {
            const i3 = i * 3;

            position[i3] = (Math.random() - 0.5) * 0.7;
            position[i3 + 1] = Math.random() - 0.1;
            position[i3 + 2] = (Math.random() - 0.5) * 0.7;

            randomScale[i] = Math.random();
            timeMultiplier[i] = 1 + Math.random();
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(position, 3));
        geometry.setAttribute("aRandomScale", new THREE.BufferAttribute(randomScale, 1));
        geometry.setAttribute("aTimeMultiplier", new THREE.BufferAttribute(timeMultiplier, 1));

        const particles = new THREE.Points(geometry, material);
        this.model.add(particles);

        const destroy = () => {
            this.model.remove(particles);
            material.dispose();
            geometry.dispose();
        }

        gsap.to(particles.material.uniforms.uProgress, {
            value: 1,
            duration: 3,
            onComplete: destroy
        });
    }

    onClick(){
        const intersect = this.raycaster.getItemIntersect(this.model.uuid);

        if (intersect) {
            this._createParticle();
        }
    }

}
