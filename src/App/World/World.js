import * as THREE from 'three';
import App from '../App.js';

import City from './City.js';
import Moon from './Moon.js';
import Stars from './Stars.js';

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
            this.stars = new Stars();
            this.scene.add(this.city.instance, this.moon.instance, this.stars.instance);
            this.ready = true;
        });
    }

    update(elapsedTime, deltaTime) {
        if (this.ready) {
            this.moon.update(elapsedTime);
            this.stars.update(elapsedTime)
        }
    }
}
