import * as THREE from 'three';
import App from '../App.js';

import City from './City.js';
import Moon from './Moon.js';

export default class World {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.resources = this.app.resources;
        this.light = new THREE.AmbientLight(0xffffff, 5);
        this.scene.add(this.light);

        this.resources.on('ready', () => {
            this.city = new City();
            this.moon = new Moon();
            this.scene.add(this.city.instance, this.moon.instance);
        });
    }

    update(elapsedTime, deltaTime) {
        if (this.moon) {
            this.moon.update(elapsedTime)
        }
    }
}
