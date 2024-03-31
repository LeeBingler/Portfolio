import * as THREE from 'three';

import App from "../App.js";

export default class Meadow {
    constructor(texture, clone) {
        this.app = new App();
        this.resources = this.app.resources;
        this.model = this.resources.items.ModelMeadow;
        this.debug = this.app.debug;
        
        this.texture = texture;
        this.clone = clone;

        this._initTexture();
        this._initMaterial();
        this._initModel();
        this._getGround();
    }

    _initTexture() {
        this.texture.flipY = false;
        this.texture.colorSpace = THREE.SRGBColorSpace;
    }

    _initMaterial() {
        this.material = new THREE.MeshBasicMaterial({
            map: this.texture,
        })
    }

    _initModel() {
        if (this.clone) {
            this.instance = this.model.scene.clone();
        } else {
            this.instance = this.model.scene;
        }
        
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
