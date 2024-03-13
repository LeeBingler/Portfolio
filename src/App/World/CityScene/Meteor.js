import * as THREE from 'three';

import App from '../../App.js';

import ShaderVertexMeteor from '../../shaders/meteor/vertex.glsl';
import ShaderFragmentMeteor from '../../shaders/meteor/fragment.glsl';

export default class Meteor {
    constructor() {
        this.app = new App();
        this.resources = this.app.resources;

        this.instance = new THREE.Group();
        
        this._initTexture();
        this._initTrail();
    }

    _initTexture() {
        this.texturePerlin = this.resources.items.TexturePerlin;
        this.texturePerlin.wrapS = THREE.RepeatWrapping;
        this.texturePerlin.wrapT = THREE.RepeatWrapping;
    }

    _initTrail() {
        this.geometryTrail = new THREE.ConeGeometry(
            1 * 0.3, 
            3 * 0.3,
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
        this.trail.position.set(0, 0.5, -2);
        this.trail.rotation.x += Math.PI;
        this.instance.add(this.trail);
    }

    update(elapsedTime) {
        this.materialTrail.uniforms.uTime.value = elapsedTime;
    }
}
