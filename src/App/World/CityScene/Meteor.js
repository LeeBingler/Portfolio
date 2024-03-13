import * as THREE from 'three';

import App from '../../App.js';

import ShaderVertexMeteor from '../../shaders/meteor/vertex.glsl';
import ShaderFragmentMeteor from '../../shaders/meteor/fragment.glsl';

import ShaderVertexMoon from '../../shaders/moon/vertex.glsl';
import ShaderFragmentMoon from '../../shaders/moon/fragment.glsl';

export default class Meteor {
    constructor() {
        this.app = new App();
        this.resources = this.app.resources;

        this.instance = new THREE.Group();
        
        this._initTexture();
        this._initTrail();
        this._initMeteor();
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
                
                uPerlinTexture: new THREE.Uniform(this.texturePerlin)
            }
        });

        this.trail = new THREE.Mesh(this.geometryTrail, this.materialTrail);
        this.trail.position.set(-0.15, 0.35, 0);
        this.trail.rotation.z -= Math.PI * 0.15;
        this.trail.rotation.x += Math.PI;

        this.instance.add(this.trail);
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
    }

    _initInstance() {
        this.instance.position.set(-7.7, 0.05, -23.6);
        this.instance.rotateY(Math.PI * 0.5);
    }

    update(elapsedTime, deltaTime) {
        this.materialTrail.uniforms.uTime.value = elapsedTime;
        this.materialMeteor.uniforms.uTime.value = elapsedTime;

        this.meteor.rotateX(deltaTime * 0.001);
        this.meteor.rotateY(deltaTime * -0.001);
        this.meteor.rotateZ(deltaTime * 0.001);
    }
}
