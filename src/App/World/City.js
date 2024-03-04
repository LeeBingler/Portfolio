import * as THREE from 'three';

import App from '../App';

export default class City {
    constructor() {
        this.app = new App();
        this.debug = this.app.debug;
        this.model = this.app.resources.items.ModelCity;

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('City');
        }

        this._initModel();
    }

    _initModel() {
        this.instance = this.model.scene;

        this.instance.position.y -= 1;

        this.instance.traverse((child) => {
            if (child.name === 'Its_Here') {
                child.material = new THREE.MeshBasicMaterial({ color: 'white' });
            }
        });
    }

    update(elapsedTime) {}
}
