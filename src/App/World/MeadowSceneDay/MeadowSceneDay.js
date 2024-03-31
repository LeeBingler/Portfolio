import * as THREE from 'three';

import App from '../../App.js';
import Meadow from '../Meadow.js';
import Grass from './Grass.js';
import Cloud from './Cloud.js';
import WaterBall from './WaterBall.js';

export default class MeadowSceneDay {
    constructor() {
        this.app = new App();
        this.camera = this.app.camera;
        this.renderer = this.app.renderer;
        this.sizes = this.app.sizes;
        this.texture = this.app.resources.items.TextureLand;

        this.scene = new THREE.Scene();
        this.fbo = new THREE.WebGLRenderTarget(this.sizes.width, this.sizes.height, { samples: 4, type: THREE.HalfFloatType });

        this.model = new Meadow(this.texture);
        this.grass = new Grass(500000, this.model.ground);
        this.waterBall = new WaterBall();
        this.cloud = new Cloud(this.scene);

        this._initInstance();
    }

    _initInstance() {
        this.instance = new THREE.Group();

        this.instance.add(
            this.model.instance,
            this.grass.instance,
            this.waterBall.instance,
            this.cloud.instance,
        );

        this.scene.add(this.instance);
    }

    update(elapsedTime, deltaTime) {
        this.grass.update(elapsedTime);
        this.cloud.update(elapsedTime);
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
            this.renderer.instance.render(this.scene, this.camera.instance);
        } else {
            this.renderer.instance.setRenderTarget(null);
            this.renderer.instance.render(this.scene, this.camera.instance);
        }
    }
}
