import * as THREE from 'three';

import App from './App';

export default class Renderer {
    constructor() {
        // Setup
        this.app = new App();
        this.canvas = this.app.canvas;
        this.sizes = this.app.sizes;
        this.scene = this.app.scene;
        this.scene2 = this.app.scene2;
        this.camera = this.app.camera;
        this.debug = this.app.debug;

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Renderer');
        }

        this._setInstance();
    }

    _setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });
        this.instance.toneMapping = THREE.CineonToneMapping;
        this.instance.toneMappingExposure = 1.75;
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
        this.instance.setClearColor(0x121212);

        if (this.debug.active) {
            const debugParameter = {};
            debugParameter.color = '#121212';

            this.debugFolder.addColor(debugParameter, 'color').onChange(() => {
                this.instance.setClearColor(debugParameter.color);
            });
        }
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.instance.render(this.scene, this.camera.instance);
    }
}
