import * as THREE from 'three';

import App from '../../App.js';

import VertexShader from '../../shaders/portal/vertex.glsl';
import FragmentShader from '../../shaders/portal/fragment.glsl';

export default class Portal {
    constructor(portalPlane) {
        this.portalPlane = portalPlane;

        this.app = new App();
        this.debug = this.app.debug;

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Portal');
        }

        this._initPortal();
    }

    _initPortal() {
        this.material = new THREE.ShaderMaterial({
            vertexShader: VertexShader,
            fragmentShader: FragmentShader,
            uniforms: {
                uTime : new THREE.Uniform(0),

                uColorIn: new THREE.Uniform(new THREE.Color('#ff0000')),
                uColorOut: new THREE.Uniform(new THREE.Color('#262626')),
            }
        });
        this.portalPlane.material = this.material;

        if (this.debug.active) {
            const debugParam = {
                colorIn: "#ff0000",
                colorOut: '#262626'
            }

            this.debugFolder.addColor(debugParam, 'colorIn').onChange(() => {
                this.material.uniforms.uColorIn.value.set(debugParam.colorIn);
            });
            this.debugFolder.addColor(debugParam, 'colorOut').onChange(() => {
                this.material.uniforms.uColorOut.value.set(debugParam.colorOut);
            });
        }
    }

    update(elapsedTime) {
        this.material.uniforms.uTime.value = elapsedTime;
    }
}
