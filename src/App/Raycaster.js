import * as THREE from 'three';

import App from './App.js';

export default class MyRaycaster {
    constructor() {
        this.app = new App();
        this.mouse = this.app.mouse;
        this.camera = this.app.camera;
        
        this.itemTestIntersects = [];
        this.items = {};

        this._initRaycaster();

        // Set the raycaster when the pointer move
        this.mouse.on('pointermove', () => {
            this.setPointer()
            this.setRaycaster();
            this.update();
        });
    }

    _initRaycaster() {
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
        this.setPointer();
        this.setRaycaster();
    }

    setPointer() {
        this.pointer.set(
            this.mouse.coordNormalize.x,
            this.mouse.coordNormalize.y
        );
    }

    setRaycaster() {
        this.raycaster.setFromCamera(this.pointer, this.camera.instance);
    }

    pushToTestIntersect(mesh) {
        if (!mesh) {
            console.error('mesh is null');
            return;
        }

        this.itemTestIntersects.push(mesh);
        this.items[mesh.uuid] = null;
    }

    getItemIntersect(uuid) {
        if (typeof uuid != 'string')
            return null;

        return this.items[uuid];
    }

    update() {
        if (this.itemTestIntersects.length <= 0) return;

        for (let uuid in this.items) {
            this.items[uuid] = null;
        }

        const intersects = this.raycaster.intersectObjects(this.itemTestIntersects);
        
        for (let i = 0; i < intersects.length; i++) {
            if (this.items[intersects[i].object.uuid] !== undefined) {
                this.items[intersects[i].object.uuid] = intersects[i];
            }
        }
    }
}
