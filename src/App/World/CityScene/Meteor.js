import * as THREE from 'three';

import App from '../../App.js';

import ShaderVertexMeteor from '../../shaders/meteor/vertex.glsl';
import ShaderFragmentMeteor from '../../shaders/meteor/fragment.glsl';
import ShaderVertexMeteorPart from '../../shaders/meteor/vertexParticles.glsl'
import ShaderFragMeteorPart from '../../shaders/meteor/fragmentParticles.glsl'


import ShaderVertexMoon from '../../shaders/moon/vertex.glsl';
import ShaderFragmentMoon from '../../shaders/moon/fragment.glsl';

export default class Meteor {
    constructor() {
        this.app = new App();
        this.resources = this.app.resources;
        this.sizes = this.app.sizes;
        this.debug = this.app.debug;

        this.instance = new THREE.Group();

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Meteor');
        }
        
        this._initTexture();
        this._initTrail();
        this._initMeteor();
        this._initParticles();
        this._initInstance();
    }

    _initTexture() {
        this.texturePerlin = this.resources.items.TexturePerlin;
        this.texturePerlin.wrapS = THREE.RepeatWrapping;
        this.texturePerlin.wrapT = THREE.RepeatWrapping;
    }

    _initTrail() {
        this.geometryTrail = new THREE.ConeGeometry(
            1 * 0.2,
            3 * 0.2,
            100,
            100,
            true
        );
        this.materialTrail = new THREE.ShaderMaterial({
            vertexShader: ShaderVertexMeteor,
            fragmentShader: ShaderFragmentMeteor,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            uniforms: {
                uTime: new THREE.Uniform(0),
                
                uSpeedNoiseSpin: new THREE.Uniform(2.5),
                uSpeedNoiseDropDown: new THREE.Uniform(2.5),
                uFrequenceNoise: new THREE.Uniform(1.5),

                uStrengthDisplacement: new THREE.Uniform(0.01),
                uFrequenceDisplacement: new THREE.Uniform(10),

                uPerlinTexture: new THREE.Uniform(this.texturePerlin),
                uColor: new THREE.Uniform(new THREE.Color('#9b1a1a'))
            }
        });

        this.trail = new THREE.Mesh(this.geometryTrail, this.materialTrail);
        this.trail.position.set(-0.15, 0.35, 0);
        this.trail.rotation.z -= Math.PI * 0.15;
        this.trail.rotation.x += Math.PI;

        this.instance.add(this.trail);
        
        if (this.debug.active) {
            this.trailFolder = this.debugFolder.addFolder('trail');
            this.trailFolder.add(this.materialTrail.uniforms.uSpeedNoiseDropDown, 'value').min(1).max(10).step(0.1).name('speedDropDown');
            this.trailFolder.add(this.materialTrail.uniforms.uSpeedNoiseSpin, 'value').min(1).max(10).step(0.1).name('speedSpin');
            this.trailFolder.add(this.materialTrail.uniforms.uFrequenceNoise, 'value').min(1).max(10).step(0.1).name('frequenceNoise');

            this.trailFolder.add(this.materialTrail.uniforms.uFrequenceDisplacement, 'value').min(1).max(20).step(0.1).name('frequenceDisp');
            this.trailFolder.add(this.materialTrail.uniforms.uStrengthDisplacement, 'value').min(1).max(10).step(0.1).name('strengthDisp');

            const debugParam = {
                color: '#9b1a1a'
            }
            this.trailFolder.addColor(debugParam, 'color').onChange(() => {
                this.materialTrail.uniforms.uColor.value.set(debugParam.color);
            })
        }
    }

    _initMeteor() {
        const uniforms = {
            uTime: new THREE.Uniform(0),
            
            uFrequenceNoise: new THREE.Uniform(10),
            uStrengthDisplacement: new THREE.Uniform(0.05),

            uColorA: new THREE.Uniform(new THREE.Color('#000')),
            uColorB: new THREE.Uniform(new THREE.Color('#ff0000')),
        };

        this.geometryMeteor = new THREE.SphereGeometry(0.03, 32, 32);
        this.materialMeteor = new THREE.ShaderMaterial({
            vertexShader: ShaderVertexMoon,
            fragmentShader: ShaderFragmentMoon,
            uniforms: uniforms
        });

        this.meteor = new THREE.Mesh(this.geometryMeteor, this.materialMeteor);
        this.meteor.position.set(0, 0.05, 0);

        this.instance.add(this.meteor);
        
        if (this.debug.active) {
            this.meteorFolder = this.debugFolder.addFolder('meteor');
            this.meteorFolder.add(this.materialMeteor.uniforms.uFrequenceNoise, 'value').min(0).max(20).step(0.1).name('frequenceNoise');
            this.meteorFolder.add(this.materialMeteor.uniforms.uStrengthDisplacement, 'value').min(0).max(1).step(0.001).name('strengthNoise');

            const debugParam = {
                colorA: '#000',
                colorB: '#ff0000'
            }
            this.meteorFolder.addColor(debugParam, 'colorA').onChange(() => {
                this.materialMeteor.uniforms.uColorA.value.set(debugParam.colorA);
            })
            this.meteorFolder.addColor(debugParam, 'colorB').onChange(() => {
                this.materialMeteor.uniforms.uColorB.value.set(debugParam.colorB);
            })
        }
    }

    _initParticlesGeometry() {
        this.geometryParticles = new THREE.BufferGeometry();

        const countParticles = 50;
        const position = new Float32Array(countParticles * 3);
        const scale = new Float32Array(countParticles);
        const timeMultiplier = new Float32Array(countParticles);
        const random = new Float32Array(countParticles);

        for (let i = 0; i < countParticles; i++) {
            const i3 = i * 3;
            
            position[i3] = 0;
            position[i3 + 1] = 0;
            position[i3 + 2] = 0;
            
            random[i] = Math.random();
            scale[i] = Math.random();
            timeMultiplier[i] = 1 + Math.random();
        }
        
        this.geometryParticles.setAttribute('position', new THREE.BufferAttribute(position, 3));
        this.geometryParticles.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));
        this.geometryParticles.setAttribute('aRandom', new THREE.BufferAttribute(random, 1));
        this.geometryParticles.setAttribute('aTimeMultiplier', new THREE.BufferAttribute(timeMultiplier, 1));
    }

    _initParticles() {
        this._initParticlesGeometry();

        this.materialParticles = new THREE.ShaderMaterial({
            vertexShader: ShaderVertexMeteorPart,
            fragmentShader: ShaderFragMeteorPart,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            uniforms: {
                uTime: new THREE.Uniform(0),
                uSize: new THREE.Uniform(0.03),
                uResolution: new THREE.Uniform(this.sizes.resolution),

                uFinalDirection: new THREE.Uniform(this.trail.rotation),
                uSpeed: new THREE.Uniform(0.38),

                uColor: new THREE.Uniform(new THREE.Color('#f6f5f4')),
            }
        });

        this.particles = new THREE.Points(this.geometryParticles, this.materialParticles);
        
        this.particles.position.copy(this.meteor.position);
        this.instance.add(this.particles);

        if (this.debug.active) {
            this.particleFolder = this.debugFolder.addFolder('particles');
            this.particleFolder.add(this.materialParticles.uniforms.uSize, 'value').min(0).max(1).step(0.01).name('sizeParticle');
            this.particleFolder.add(this.materialParticles.uniforms.uSpeed, 'value').min(0).max(1).step(0.001).name('speedParticle');

            const debugParam = {
                color: '#f6f5f4'
            }
            this.particleFolder.addColor(debugParam, 'color').onChange(() => {
                this.materialParticles.uniforms.uColor.value.set(debugParam.color);
            })
        }
    }

    _initInstance() {
        this.instance.position.set(-7.7, 0.15, -23.6);
        this.instance.rotateY(Math.PI * 0.5);
    }

    update(elapsedTime, deltaTime) {
        this.materialTrail.uniforms.uTime.value = elapsedTime;
        this.materialMeteor.uniforms.uTime.value = elapsedTime;
        this.materialParticles.uniforms.uTime.value = elapsedTime;

        this.meteor.rotateX(deltaTime * 0.001);
        this.meteor.rotateY(deltaTime * -0.001);
        this.meteor.rotateZ(deltaTime * 0.001);
    }
}
