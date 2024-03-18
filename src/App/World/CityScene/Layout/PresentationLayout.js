import * as THREE from 'three';

import App from '../../../App.js';

import presentationVertexShader from '../../../shaders/presentation/vertex.glsl';
import presentationFragmentShader from '../../../shaders/presentation/fragment.glsl';
import TouchTexture from '../../../Utils/TouchTexture.js';

export default class PresentationLayout {
    constructor() {
        this.app = new App();
        this.sizes = this.app.sizes;
        this.camera = this.app.camera.instance;
        this.resource = this.app.resources;
        this.raycaster = this.app.raycaster;

        this.texture = this.resource.items.TexturePresentation;
        this.touchTexture = new TouchTexture(16, 9, 50, 0.15);
        
        this._initMaterial();
        this._initGeometry();
        this._initInstance();

        // Make the raycaster detect the plane
        this.raycaster.pushToTestIntersect(this.instance, 'presentation');
    }

    _initMaterial() {
        this.materialPresentation = new THREE.ShaderMaterial({
            vertexShader: presentationVertexShader,
            fragmentShader: presentationFragmentShader,
            transparent: true,
            side: THREE.DoubleSide,

            uniforms: {
                uTouchTexture: new THREE.Uniform(this.touchTexture.texture),
                uTexture: new THREE.Uniform(this.texture)
            }
        });
    }

    _initGeometry() {
        this.geometryPresentation = new THREE.PlaneGeometry(16 / 4, 9 / 4);
    }

    _initInstance() {
        this.instance = new THREE.Mesh(
            this.geometryPresentation, 
            this.materialPresentation
        );

        this.instance.position.set(0, 1, -3.5);
        this.instance.lookAt(this.camera.position);
    }

    onPointerMove() {
        const intersect = this.raycaster.getItemIntersect(this.instance.uuid);

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
