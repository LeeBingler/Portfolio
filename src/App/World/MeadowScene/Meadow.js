import * as THREE from 'three';

import App from "../../App";

export default class Meadow {
    constructor() {
        this.app = new App();
        this.resources = this.app.resources;
        this.model = this.resources.items.ModelMeadow;
        this.debug = this.app.debug;
        
        this._initTexture();
        this._initMaterial();
        this._initModel();
        this._getGround();
    }

    _initTexture() {
        this.texture = this.resources.items.TextureLand;
        this.texture.flipY = false;
        this.texture.colorSpace = THREE.SRGBColorSpace;
    }

    _initMaterial() {
        this.material = new THREE.MeshBasicMaterial({
            map: this.texture,
        })
    }

    _initModel() {
        this.instance = this.model.scene;
        
        this.instance.traverse((child) => {
            child.material = this.material;
        });
    }

    _getGround() {
        this.instance.traverse((child) => {
            if (child.name === "Ground") {
                this.ground = child;
                this.ground.material = new THREE.MeshBasicMaterial({color: 'black'})
            }
        })
    }
}
