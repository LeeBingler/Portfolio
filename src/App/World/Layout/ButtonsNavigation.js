import gsap from 'gsap';

import EventEmitter from '../../Utils/EventEmitter.js';
import App from '../../App.js';

export default class ButtonsNavigation extends EventEmitter {
    constructor() {
        super();
        this.app = new App();
        this.camera = this.app.camera;
        this.durationAnimationMove = 1.7;
        this.durationAnimationRotate = 1.5;
        this.delayAnimation = 0.25;

        this._initSection();
        this._createHomeButton();
        this._createAboutButton();
        this._createPortfolioButton();
        this._createContactButton();

        document.body.append(this.section);
    }

    _initSection() {
        this.section = document.createElement('section');
        this.section.classList.add('section-buttons');
    }

    _createHomeButton() {
        this.homeBtn = this._createButton('Home');
        this.homeBtn.classList.add('buttons-active');

        this.homeBtn.addEventListener('click', () => {
            if (this.homeBtn.classList.contains('buttons-active'))
                return;

            this.trigger('buttonClick');
            gsap.to(this.camera.instance.position, {
                x: 0,
                y: 0,
                z: 0,
                duration: this.durationAnimationMove,
                delay: this.delayAnimation,
                overwrite: 'auto',
            });
            gsap.to(this.camera.instance.rotation, {
                x: Math.PI * 0.07,
                y: 0,
                z: 0,
                duration: this.durationAnimationRotate,
                delay: this.delayAnimation,
                overwrite: 'auto',
            });
            this._handleActiveClass(this.homeBtn);
        });

        this.section.append(this.homeBtn);
    }

    _createAboutButton() {
        this.aboutBtn = this._createButton('About');

        this.aboutBtn.addEventListener('click', () => {
            if (this.aboutBtn.classList.contains('buttons-active'))
                return;

            this.trigger('buttonClick');
            gsap.to(this.camera.instance.position, {
                x: -6,
                y: 0.2,
                z: -22.3,
                duration: this.durationAnimationMove,
                delay: this.delayAnimation,
                overwrite: 'auto',
            });
            gsap.to(this.camera.instance.rotation, {
                x: 0,
                y: Math.PI * 0.4,
                duration: this.durationAnimationRotate,
                delay: this.delayAnimation,
                overwrite: 'auto',
                onComplete: () => {
                    this.trigger('endAnimation', ['about']);
                }
            });
            this._handleActiveClass(this.aboutBtn);
        });

        this.section.append(this.aboutBtn);
    }

    _createContactButton() {
        this.contactBtn = this._createButton('Contact');

        this.contactBtn.addEventListener('click', () => {
            if (this.contactBtn.classList.contains('buttons-active'))
                return;

            this.trigger('buttonClick');
            gsap.to(this.camera.instance.position, {
                x: 5.2,
                y: 0.65,
                z: -18.2,
                duration: this.durationAnimationMove,
                delay: this.delayAnimation,
                overwrite: 'auto',
            });
            gsap.to(this.camera.instance.rotation, {
                x: 0,
                y: Math.PI * -0.6,
                z: 0,
                duration: this.durationAnimationRotate,
                delay: this.delayAnimation,
                overwrite: 'auto',
                onComplete: () => {
                    this.trigger('endAnimation', ['contact'])
                },
            });
            this._handleActiveClass(this.contactBtn);
        });

        this.section.append(this.contactBtn);
    }

    _createPortfolioButton() {
        this.portfolioBtn = this._createButton('Portfolio');

        this.portfolioBtn.addEventListener('click', () => {
            if (this.portfolioBtn.classList.contains('buttons-active'))
                return;

            this.trigger('buttonClick');
            gsap.to(this.camera.instance.position, {
                x: 0,
                y: 16,
                z: -30,
                duration: this.durationAnimationMove,
                delay: this.delayAnimation,
                overwrite: 'auto',

            });
            gsap.to(this.camera.instance.rotation, {
                x: Math.PI * 0.07,
                y: 0,
                z: 0,
                duration: this.durationAnimationRotate,
                delay: this.delayAnimation,
                overwrite: 'auto',
                onComplete: () => {
                    this.trigger('endAnimation', ['portfolio'])
                }
            });
            this._handleActiveClass(this.portfolioBtn);
        });

        this.section.append(this.portfolioBtn);
    }

    _handleActiveClass(button) {
        if (button.classList.contains('buttons-active')) {
            return;
        }
        this._removeClassActiveButtons();
        this._addClassActiveButtons(button);
    }

    _removeClassActiveButtons() {
        this.homeBtn.classList.remove('buttons-active');
        this.aboutBtn.classList.remove('buttons-active');
        this.portfolioBtn.classList.remove('buttons-active');
        this.contactBtn.classList.remove('buttons-active');
    }

    _addClassActiveButtons(button) {
        button.classList.add('buttons-active');
    }

    _createButton(innerText) {
        const button = document.createElement('button');
        button.append(document.createTextNode(innerText));
        button.classList.add('buttons');
        button.classList.add(`buttons-${innerText.toLowerCase()}`);

        return button;
    }
}
