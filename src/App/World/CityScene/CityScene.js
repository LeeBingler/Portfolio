import * as THREE from 'three';

import City from './City.js';
import Moon from './Moon.js';
import Stars from './Stars.js';
import CityLayout from './Layout/CityLayout.js';
import Meteor from './Meteor.js';

export default class CityScene {
    constructor() {
        this.city = new City();
        this.moon = new Moon();
        this.stars = new Stars();
        this.layout = new CityLayout();
        this.meteor = new Meteor();

        this._initCityScene();
    }

    _initCityScene() {
        this.instance = new THREE.Group();
        
        this.instance.add(
            this.city.instance,
            this.moon.instance, 
            this.stars.instance,
            //this.layout.instance,
            this.meteor.instance,
        );

    }

    onPointerMove() {
        this.layout.onPointerMove();
    }

    update(elapsedTime) {
        this.moon.update(elapsedTime);
        this.stars.update(elapsedTime);
        this.meteor.update(elapsedTime);
        this.layout.update();
    }
}
