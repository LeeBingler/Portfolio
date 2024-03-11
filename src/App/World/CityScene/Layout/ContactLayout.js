import { Euler } from 'three';

import App from '../../../App.js'
import HTMLLayoutObj3D from './HtmlLayoutObj3D.js';

export default class ContactLayout extends HTMLLayoutObj3D {
    constructor(htmlPlane) {
        super();
        this.app = new App();
        this.cssScene = this.app.cssScene;
        
        this.htmlPlane = htmlPlane;
        this._initSection();
    }

    _initSection() {
        this.instance = this.createLayoutElem({
            tag: 'section',
            className : 'contact-container', 
            childElement : '<h1>Contact Section Text Test</h1>', 
            pos : this.htmlPlane.position, 
            rot : new Euler(0, -this.htmlPlane.rotation.z, 0)
        });

        this.cssScene.add(this.instance);
    }
}
