import * as THREE from 'three';

import App from '../../App.js';
import Grass from './Grass';
import Meadow from './Meadow.js';
import WaterBall from './WaterBall.js';

export default class MeadowScene {
    constructor() {
        this.app = new App();
        this.camera = this.app.camera;
        this.renderer = this.app.renderer;
        this.sizes = this.app.sizes;

        this.MeadowScene = new THREE.Scene();
        this.fbo = new THREE.WebGLRenderTarget(this.sizes.width, this.sizes.height, { samples: 4, type: THREE.HalfFloatType });

        this.model = new Meadow();
        this.grass = new Grass(1000000, this.model.ground);
        this.waterBall = new WaterBall();

        this._initInstance();
    }

    _initInstance() {
        this.instance = new THREE.Group();

        this.instance.add(
            this.grass.instance,
            this.model.instance,
            this.waterBall.instance,
        );

        this.MeadowScene.add(this.instance);
    }

    update(elapsedTime, deltaTime) {
        this.grass.update(elapsedTime);
    }

    resize() {
        this.fbo.setSize(this.sizes.width, this.sizes.height);
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
