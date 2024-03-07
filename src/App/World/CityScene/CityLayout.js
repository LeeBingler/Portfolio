import * as THREE from 'three';

import App from '../../App.js';

import presentationVertexShader from '../../shaders/presentation/vertex.glsl';
import presentationFragmentShader from '../../shaders/presentation/fragment.glsl';

export default class CityLayout {
    constructor() {
        this.app = new App();
        this.camera = this.app.camera.instance;
        this.resource = this.app.resources;
        this.raycaster = this.app.raycaster;

        this.texture = this.resource.items.TexturePresentation;
        this.instance = new THREE.Group();
        
        this._initMaterial();
        this._initPresentationSection();
    }

    _initMaterial() {
        this.materialPresentation = new THREE.ShaderMaterial({
            vertexShader: presentationVertexShader,
            fragmentShader: presentationFragmentShader,
            transparent: true,

            uniforms: {
                uTexture: new THREE.Uniform(this.texture)
            }
        });
    }

    _initPresentationSection() {
        this.geometryPresentation = new THREE.PlaneGeometry(16 / 4, 9 / 4);
        this.presentationPlane = new THREE.Mesh(
            this.geometryPresentation, 
            this.materialPresentation
        );

        this.presentationPlane.position.set(0, 1, -3.5);
        this.presentationPlane.lookAt(this.camera.position);

        this.instance.add(this.presentationPlane);
    }

    onPointerMove() {
        console.log(this.raycaster.getItemIntersect(this.presentationPlane.uuid))
    }
}
