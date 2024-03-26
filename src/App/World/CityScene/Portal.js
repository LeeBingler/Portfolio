import * as THREE from 'three';
import gsap from 'gsap';

import App from '../../App.js';

import VertexShader from '../../shaders/portal/vertex.glsl';
import FragmentShader from '../../shaders/portal/fragment.glsl';

export default class Portal {
    constructor(portalPlane) {
        this.portalPlane = portalPlane;

        this.app = new App();
        this.resources = this.app.resources;
        this.raycaster = this.app.raycaster;
        this.mouse = this.app.mouse;
        this.sizes = this.app.sizes;
        this.debug = this.app.debug;

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Portal');
        }
        
        this._initTexture();
        this._initPortal();

        this.raycaster.pushToTestIntersect(this.portalPlane, 'portalPlane');

        this.mouse.on('click', () => {
            this.onClick();
        });
    }

    _initTexture() {
        this.texture = this.resources.items.TexturePaysage;
    }

    _initPortal() {
        this.material = new THREE.ShaderMaterial({
            vertexShader: VertexShader,
            fragmentShader: FragmentShader,
            uniforms: {
                uTime : new THREE.Uniform(0),

                uColorIn: new THREE.Uniform(new THREE.Color('#ff0000')),
                uColorOut: new THREE.Uniform(new THREE.Color('#000000')),
                uImage: new THREE.Uniform(this.texture),
                uProgress: new THREE.Uniform(0),
                uResolution: new THREE.Uniform(this.sizes.resolution)
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

    onClick() {
        const intersect = this.raycaster.getItemIntersect(this.portalPlane.uuid);

        if (intersect) {
            gsap.fromTo(this.material.uniforms.uProgress, 
                {
                    value: 0,
                }, 
                {
                    value: 1,
                    duration: 2
                }
            );
        }
    }

    update(elapsedTime) {
        this.material.uniforms.uTime.value = elapsedTime;
    }
}
