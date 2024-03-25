import * as THREE from 'three';

import App from "../../App";

export default class Meadow {
    constructor() {
        this.app = new App();
        this.resources = this.app.resources;
        this.model = this.resources.items.ModelMeadow;
        this.debug = this.app.debug;
        
        this.materials = {};
        this.toClean = [];

        this._initModel();
        this._getGround();
    }

    _initModel() {
        this.instance = this.model.scene;
        
        this.instance.traverse((child) => {
            if (!child.isMesh) {
                return ;
            }
            const hexString = child.material.color.getHexString();

            if (!this.materials[hexString]) {
                this.materials[hexString] = new THREE.MeshBasicMaterial({color: '#' + hexString});
                this.toClean.push(child.material);
            }

            child.material = this.materials[hexString];

            this.toClean.forEach((color) => color.dispose())

        });
    }

    _getGround() {
        this.instance.traverse((child) => {
            if (child.name === "Ground") {
                this.ground = child;
                this.ground.material.color.set(0,0,0);
            }
        })
    }
}
