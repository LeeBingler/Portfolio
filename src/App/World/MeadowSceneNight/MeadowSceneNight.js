import * as THREE from 'three';

import App from "../../App.js";

import Meadow from '../Meadow.js';
import Grass from '../Grass.js';
import Moon from './Moon.js';
import Stars from './Stars.js';

export default class MeadowSceneNight {
    constructor() {
        this.app = new App();
        this.camera = this.app.camera;
        this.renderer = this.app.renderer;
        this.sizes = this.app.sizes;
        this.texture = this.app.resources.items.TextureLandNight;

        this.scene = new THREE.Scene();
        this.fbo = new THREE.WebGLRenderTarget(this.sizes.width, this.sizes.height, { samples: 4, type: THREE.HalfFloatType });

        this.model = new Meadow(this.texture, true);
        this.grass = new Grass(
            400000, 
            this.model.ground,
            new THREE.Color("#00aa00"),
            new THREE.Color("#008800"),
        );
        this.moon = new Moon();
        this.stars = new Stars();
        this._colorGround();
        this._initScene();
    }

    _colorGround() {
        this.model.ground.material = new THREE.MeshBasicMaterial({color: "#00aa00"});
    }

    _initScene() {
        this.instance = new THREE.Group();

        this.instance.add(
            this.model.instance,
            this.grass.instance,
            this.moon.instance,
            this.stars.instance,
        );

        this.scene.add(this.instance);
    }

    onClick() {
        this.model.onClick();
    }

    update(elapsedTime, deltaTime) {
        this.grass.update(elapsedTime);
        this.moon.update(elapsedTime);
        this.stars.update(elapsedTime);
    }

    resize() {
        this.fbo.setSize(this.sizes.width, this.sizes.height);
    }

    render(rtt, elapsedTime, deltaTime) {
        this.update(elapsedTime, deltaTime);

        this.renderer.instance.setClearColor(0x121212);

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
