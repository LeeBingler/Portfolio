import * as THREE from 'three';

import App from '../../App.js';
import AboutLayout from './AboutLayout.js';
import ButtonMode from './ButtonMode.js';
import ButtonsNavigation from './ButtonsNavigation.js';
import ContactLayout from './ContactLayout.js';
import CvButton from './CvButton.js';
import PortfolioLayout from './PortfolioLayout.js';
import PresentationLayout from './PresentationLayout.js';

export default class Layout {
    constructor() {
        this.app = new App();
        this.camera = this.app.camera.instance;
        this.resource = this.app.resources;
        this.raycaster = this.app.raycaster;

        this.instance = new THREE.Group();
        this.mainSection = document.querySelector('#main-container');

        this._addItemsThree();
        this._addItemsHTML();

        // Click button handler
        this.buttonsNavigation.on('buttonClick', () => {
            this.contact.removeActiveOnSection();
            this.about.removeActiveOnSection();
            this.portfolio.removeActiveOnSection();
        })

        this.buttonsNavigation.on('endAnimation', (str) => {
            if (str == 'about') {
                this.about.addActiveOnSection();
            } else if (str == 'contact') {
                this.contact.addActiveOnSection();
            } else if (str == 'portfolio') {
                this.portfolio.addActiveOnSection();
            }
        })
    }

    _addItemsThree() {
        this.presentation = new PresentationLayout();

        this.instance.add(this.presentation.instance);
    }

    _addItemsHTML() {
        this.portfolio = new PortfolioLayout();
        this.about = new AboutLayout();
        this.contact = new ContactLayout();
        this.buttonsNavigation = new ButtonsNavigation(this);
        this.buttonMode = new ButtonMode();
        this.buttonCv = new CvButton();

        this.mainSection.append(this.about.section, this.contact.section, this.portfolio.section);
    }

    resize() {
        this.presentation.resize();
    }

    onPointerMove() {
        this.presentation.onPointerMove();
    }

    update() {
        this.presentation.update();
    }
}
