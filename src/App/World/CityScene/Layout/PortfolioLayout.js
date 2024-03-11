import * as THREE from 'three';

import App from '../../../App.js'
import HTMLLayoutObj3D from './HtmlLayoutObj3D.js';

export default class PortfolioLayout extends HTMLLayoutObj3D {
    constructor() {
        super();
        this.app = new App();
        this.scene = this.app.scene;
        this.cssScene = this.app.cssScene;

        this._initPlane();
        this._initSection();
    }

    _initPlane() {
        this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(),
            new THREE.MeshBasicMaterial()
        );

        this.plane.position.set(0, 16.5, -32);
    }

    _initSection() {
        this.instance = this.createLayoutElem({
            tag: 'section',
            className : 'portfolio-container', 
            childElement : '<h1>Portfolio Section Text Test</h1>', 
            pos : this.plane.position, 
            rot : this.plane.rotation
        });

        this.cssScene.add(this.instance);
    }
}
