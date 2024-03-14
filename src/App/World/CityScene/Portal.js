import * as THREE from 'three';

import VertexShader from '../../shaders/portal/vertex.glsl';
import FragmentShader from '../../shaders/portal/fragment.glsl';

export default class Portal {
    constructor(portalPlane) {
        this.portalPlane = portalPlane;

        this._initPortal();
    }

    _initPortal() {
        this.material = new THREE.ShaderMaterial({
            vertexShader: VertexShader,
            fragmentShader: FragmentShader,
            uniforms: {
                uTime : new THREE.Uniform(0),

                uColorIn: new THREE.Uniform(new THREE.Color('white')),
                uColorOut: new THREE.Uniform(new THREE.Color('black')),
            }
        });
        this.portalPlane.material = this.material; 
    }

    update(elapsedTime) {
        this.material.uniforms.uTime.value = elapsedTime;
    }
}
