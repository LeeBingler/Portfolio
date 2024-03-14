import * as THREE from 'three';

import App from '../../App';

export default class City {
    constructor() {
        this.app = new App();
        this.debug = this.app.debug;
        this.model = this.app.resources.items.ModelCity;
        this.texture = this.app.resources.items.TextureCity;

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('City');
        }

        this._initMaterial();
        this._initModel();
        this._getPortalPlane();
    }

    _initMaterial() {
        this.texture.flipY = false;
        this.texture.colorSpace = THREE.SRGBColorSpace;

        this.material = new THREE.MeshBasicMaterial({
            map: this.texture
        })
    }

    _initModel() {
        this.instance = this.model.scene;
        
        this.instance.traverse((child) => {
            child.material = this.material;
        })

        this.instance.position.y -= 0.1;
    }

    _getPortalPlane() {
        this.portalPlane = null;

        this.instance.traverse((child) => {
            if (child.name == 'PortalPlane') {
                this.portalPlane = child;
            }
        });
    }

    update(elapsedTime) {}
}
