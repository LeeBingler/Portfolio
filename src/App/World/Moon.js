import App from '../App.js';

import * as THREE from 'three';

export default class Moon {
    constructor() {
        this.app = new App();
        this.camera = this.app.camera;
        this.debug = this.app.debug;

        this._initGeo();
        this._initMat();
        this._initMoon();
    }

    _initGeo() {
        this.geometry = new THREE.SphereGeometry(8);
    }

    _initMat() {
        this.material = new THREE.MeshBasicMaterial({ color: 'red' });
    }

    _initMoon() {
        this.moon = new THREE.Mesh(this.geometry, this.material);
        this.moon.lookAt(this.camera.instance.position);

        this.Plight = new THREE.PointLight(0xff0000, 3000);
        this.Plight.position.z += 5;

        this.instance = new THREE.Group();
        this.instance.add(this.moon, this.Plight);

        this.instance.position.set(0, 15, -40);
    }
}
