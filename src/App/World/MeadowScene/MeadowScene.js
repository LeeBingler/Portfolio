import * as THREE from 'three';

import App from '../../App.js';
import Grass from './Grass';

export default class MeadowScene {
    constructor() {
        this.app = new App();
        this.camera = this.app.camera;
        this.renderer = this.app.renderer;
        this.sizes = this.app.sizes;

        this.MeadowScene = new THREE.Scene();
        this.fbo = new THREE.WebGLRenderTarget(this.sizes.width, this.sizes.height);

        this.grass = new Grass(10000);

        this._initInstance();
    }

    _initInstance() {
        this.instance = new THREE.Group();

        this.instance.add(this.grass.instance);

        this.instance.position.z -= 5;

        this.MeadowScene.add(this.instance);
    }

    update(elapsedTime, deltaTime) {
        this.grass.update(elapsedTime);
    }

    resize() {
        this.fbo.width = this.sizes.width;
        this.fbo.height = this.sizes.height;
    }

    render(rtt, elapsedTime, deltaTime) {
        this.update(elapsedTime, deltaTime);

        this.renderer.instance.setClearColor(0x87CEEB);

        if (rtt) {
            this.renderer.instance.setRenderTarget(this.fbo);
            this.renderer.instance.clear();
            this.renderer.instance.render(this.MeadowScene, this.camera.instance);
        } else {
            this.renderer.instance.setRenderTarget(null);
            this.renderer.instance.render(this.MeadowScene, this.camera.instance);
        }
    }
}
