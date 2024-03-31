import * as THREE from 'three';

import App from "../App.js";
import Scarecrow from './Scarecrow.js';

export default class Meadow {
    constructor(texture, clone) {
        this.texture = texture;
        this.clone = clone;

        this.app = new App();
        this.resources = this.app.resources;
        this.model = this.resources.items.ModelMeadow;
        this.debug = this.app.debug;

        this._initTexture();
        this._initMaterial();
        this._initModel();
        this._getMultipleThings();
        this._initSpecial();
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

        this.instance.position.y -= 0.01;
    }

    _getMultipleThings() {
        this.instance.traverse((child) => {
            if (child.name === "Ground") {
                this.ground = child;
                this.ground.material = new THREE.MeshBasicMaterial({color: 'green'})
            }

            if (child.name === "Scarecrow") {
                this.scarecrow = child;
            }
        })
    }

    _initSpecial() {
        this.scarecrow = new Scarecrow(this.scarecrow);
    }

    onClick() {
        this.scarecrow.onClick();
    }
}
