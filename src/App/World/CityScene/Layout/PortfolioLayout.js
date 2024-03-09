import * as THREE from 'three';

import App from '../../../App.js';

export default class PortfolioLayout {
    constructor() {
        this.app = new App();
        this.raycaster = this.app.raycaster;

        this._initSection();
    }

    _initSection() {
        this.position = new THREE.Vector3();
        this.position.set(0, 16.5, -32);
        this.rotationX = Math.PI * 0.07;

        this.section = document.createElement('section');
        this.section.classList.add('portfolio-container');

        this.section.append(document.createTextNode('Portfolio Layout'));

        document.body.append(this.section);
    }

    openSection() {
        if (!this.section) return;

        this.section.classList.add('active');
    }

    closeSection() {
        if (!this.section) return;

        this.section.classList.remove('active');
    }
}
