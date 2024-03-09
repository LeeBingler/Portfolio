import * as THREE from 'three';

import App from '../../../App.js';
import AboutLayout from './AboutLayout.js';
import ButtonsNavigation from './ButtonsNavigation.js';
import PortfolioLayout from './PortfolioLayout.js';
import PresentationLayout from './PresentationLayout.js';

export default class CityLayout {
    constructor() {
        this.app = new App();
        this.camera = this.app.camera.instance;
        this.resource = this.app.resources;
        this.raycaster = this.app.raycaster;

        this.instance = new THREE.Group();
        
        this._addItems();
    }

    _addItems() {
        this.presentation = new PresentationLayout();
        this.portfolio = new PortfolioLayout();
        this.about = new AboutLayout();
        this.buttonsNavigation = new ButtonsNavigation(this);

        this.instance.add(this.presentation.instance);
    }


    onPointerMove() {
        this.presentation.onPointerMove();
    }

    update() {
        this.presentation.update();
    }
}
