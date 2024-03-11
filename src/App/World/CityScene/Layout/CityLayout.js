import * as THREE from 'three';

import App from '../../../App.js';
import AboutLayout from './AboutLayout.js';
import ButtonsNavigation from './ButtonsNavigation.js';
import ContactLayout from './ContactLayout.js';
import PortfolioLayout from './PortfolioLayout.js';
import PresentationLayout from './PresentationLayout.js';

export default class CityLayout {
    constructor(htmlPlane) {
        this.app = new App();
        this.camera = this.app.camera.instance;
        this.resource = this.app.resources;
        this.raycaster = this.app.raycaster;

        this.instance = new THREE.Group();
        this.htmlPlane = htmlPlane;
        
        this._addItemsThree();
        this._addItemsHTML();
    }

    _addItemsThree() {
        this.presentation = new PresentationLayout();

        this.instance.add(this.presentation.instance);
    }

    _addItemsHTML() {
        this.portfolio = new PortfolioLayout();
        this.about = new AboutLayout(this.htmlPlane.AboutHtml);
        this.contact = new ContactLayout(this.htmlPlane.ContactHtml);
        this.buttonsNavigation = new ButtonsNavigation(this);
    }


    onPointerMove() {
        this.presentation.onPointerMove();
    }

    update() {
        this.presentation.update();
    }
}
