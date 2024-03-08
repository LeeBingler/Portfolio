import * as THREE from 'three';

import App from '../../App.js';

import presentationVertexShader from '../../shaders/presentation/vertex.glsl';
import presentationFragmentShader from '../../shaders/presentation/fragment.glsl';
import TouchTexture from '../../Utils/TouchTexture.js';

export default class CityLayout {
    constructor() {
        this.app = new App();
        this.camera = this.app.camera.instance;
        this.resource = this.app.resources;
        this.raycaster = this.app.raycaster;

        this.texture = this.resource.items.TexturePresentation;
        this.touchTexture = new TouchTexture(16, 9, 50, 0.15);

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
                uTouchTexture: new THREE.Uniform(this.touchTexture.texture),
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
        const intersect = this.raycaster.getItemIntersect(this.presentationPlane.uuid);

        if (intersect) {
            this.touchTexture.addTouch({
                x: intersect.uv.x,
                y: intersect.uv.y
            });
        } 
    }

    update() {
        this.touchTexture.update();
    }
}
