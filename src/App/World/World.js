import * as THREE from 'three';
import App from '../App.js';
import CityScene from './CityScene/CityScene.js';

export default class World {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.resources = this.app.resources;
        this.light = new THREE.AmbientLight(0xffffff, 5);
        this.scene.add(this.light);

        this.resources.on('ready', () => {
            this.cityScene = new CityScene();
            this.scene.add(this.cityScene.instance);
            this.ready = true;
        });
    }

    update(elapsedTime, deltaTime) {
        if (this.ready) {
            this.cityScene.update(elapsedTime);
        }
    }
}
