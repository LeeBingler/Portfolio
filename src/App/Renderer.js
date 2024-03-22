import * as THREE from 'three';

import App from './App';

export default class Renderer {
    constructor() {
        // Setup
        this.app = new App();
        this.canvas = this.app.canvas;
        this.sizes = this.app.sizes;
        this.mainScene = this.app.scene;
        this.camera = this.app.camera;
        this.debug = this.app.debug;

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Renderer');
        }

        this._setInstance();
        this._setFog();
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

    _setFog() {
        this.mainScene.fog = new THREE.Fog(0xaaaaaa, 0, 120);
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.instance.setRenderTarget(null);
        this.instance.setClearColor(0x121212);
        this.instance.render(this.mainScene, this.camera.orthographic);
    }
}
