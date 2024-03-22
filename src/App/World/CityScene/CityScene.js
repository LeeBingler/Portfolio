import * as THREE from 'three';

import App from "../../App.js";

import City from './City.js';
import Moon from './Moon.js';
import Stars from './Stars.js';
import Meteor from './Meteor.js';
import Portal from './Portal.js';

export default class CityScene {
    constructor() {
        this.app = new App();
        this.camera = this.app.camera;
        this.renderer = this.app.renderer;
        this.sizes = this.app.sizes;

        this.CityScene = new THREE.Scene();
        this.fbo = new THREE.WebGLRenderTarget(this.sizes.width, this.sizes.height);

        this.city = new City();
        this.moon = new Moon();
        this.stars = new Stars();
        this.meteor = new Meteor();
        this.portal = new Portal(this.city.portalPlane);

        this._initCityScene();
    }

    _initCityScene() {
        this.instance = new THREE.Group();

        this.instance.add(
            this.city.instance,
            this.moon.instance,
            this.stars.instance,
            this.meteor.instance,
        );

        this.CityScene.add(this.instance);
    }

    update(elapsedTime, deltaTime) {
        this.moon.update(elapsedTime);
        this.stars.update(elapsedTime);
        this.meteor.update(elapsedTime, deltaTime);
        this.portal.update(elapsedTime);
    }

    resize() {
        this.fbo.width = this.sizes.width;
        this.fbo.height = this.sizes.height;
    }

    render(rtt, elapsedTime, deltaTime) {
        this.update(elapsedTime, deltaTime);

        this.renderer.instance.setClearColor(0x121212);

        if (rtt) {
            this.renderer.instance.setRenderTarget(this.fbo);
            this.renderer.instance.clear();
            this.renderer.instance.render(this.CityScene, this.camera.instance);
        } else {
            this.renderer.instance.setRenderTarget(null);
            this.renderer.instance.render(this.CityScene, this.camera.instance);
        }
    }
}
