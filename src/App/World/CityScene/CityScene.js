import * as THREE from 'three';

import City from './City.js';
import Moon from './Moon.js';
import Stars from './Stars.js';

export default class CityScene {
    constructor() {
        this.city = new City();
        this.moon = new Moon();
        this.stars = new Stars();

        this._initCityScene();
    }

    _initCityScene() {
        this.instance = new THREE.Group();

        this.instance.add(this.city.instance, this.moon.instance, this.stars.instance);
    }

    update(elapsedTime) {
        this.moon.update(elapsedTime);
        this.stars.update(elapsedTime);
    }
}
