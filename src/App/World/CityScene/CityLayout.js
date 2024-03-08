import * as THREE from 'three';

import App from '../../App.js';
import PresentationLayout from './PresentationLayout.js';

export default class CityLayout {
    constructor() {
        this.app = new App();
        this.camera = this.app.camera.instance;
        this.resource = this.app.resources;
        this.raycaster = this.app.raycaster;

        this.instance = new THREE.Group();
        
        this._addItems();
    }

    _addItems() {
        this.presentation = new PresentationLayout();

        this.instance.add(this.presentation.instance);
    }


    onPointerMove() {
        this.presentation.onPointerMove();
    }

    update() {
        this.presentation.update();
    }
}
