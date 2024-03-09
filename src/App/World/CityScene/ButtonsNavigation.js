import gsap from 'gsap';

import App from '../../App.js';

export default class ButtonsNavigation {
    constructor(citylayout) {
        this.app = new App();
        this.camera = this.app.camera;
        this.durationAnimation = 1.7;
        this.delayAnimation = 0.25;
        this.cityLayout = citylayout;

        this._initSection();
        this._createHomeButton();
        this._createAboutButton();
        this._createPortfolioButton();
        this._createContactButton();
        
        document.body.append(this.section);
    }

    _initSection() {
        this.section = document.createElement('section');
        this.section.classList.add('section');
    }

    _createHomeButton() {
        this.homeBtn = this._createButton('Home');
        this.homeBtn.classList.add('buttons-home');
        this.homeBtn.classList.add('buttons-active');

        this.homeBtn.addEventListener('click', () => {
            gsap.to(this.camera.instance.position, {
                x: 0,
                y: 0,
                z: 0,
                duration: this.durationAnimation,
                delay: this.delayAnimation,
            });
            gsap.to(this.camera.instance.rotation, {
                x: Math.PI * 0.07,
                y: 0,
                duration: this.durationAnimation,
                delay: this.delayAnimation,
            });
            this._handleActiveClass(this.homeBtn);
        });

        this.section.append(this.homeBtn);
    }

    _createAboutButton() {
        this.aboutBtn = this._createButton('About');
        this.aboutBtn.classList.add('buttons-about');

        this.aboutBtn.addEventListener('click', () => {
            gsap.to(this.camera.instance.position, {
                x: -5.7,
                y: 0.28,
                z: -22.4,
                duration: this.durationAnimation,
                delay: this.delayAnimation,
            });
            gsap.to(this.camera.instance.rotation, {
                x: 0,
                y: Math.PI * 0.4,
                duration: this.durationAnimation,
                delay: this.delayAnimation,
            });
            this._handleActiveClass(this.aboutBtn);
        });

        this.section.append(this.aboutBtn);
    }

    _createContactButton() {
        this.contactBtn = this._createButton('Contact');
        this.contactBtn.classList.add('buttons-contact');

        this.contactBtn.addEventListener('click', () => {
            gsap.to(this.camera.instance.position, {
                x: 6.5,
                y: 0.4,
                z: -18,
                duration: this.durationAnimation,
                delay: this.delayAnimation,
            });
            gsap.to(this.camera.instance.rotation, {
                x: 0,
                y: Math.PI * -0.55,
                duration: this.durationAnimation,
                delay: this.delayAnimation,
            });

            this._handleActiveClass(this.contactBtn);
        });

        this.section.append(this.contactBtn);
    }
    
    _createPortfolioButton() {
        this.portfolioBtn = this._createButton('Portfolio');
        this.portfolioBtn.classList.add('buttons-portfolio');

        this.portfolioBtn.addEventListener('click', () => {
            gsap.to(this.camera.instance.position, {
                x: 0,
                y: 16,
                z: -30,
                duration: this.durationAnimation,
                delay: this.delayAnimation,

            });
            gsap.to(this.camera.instance.rotation, {
                x: Math.PI * 0.07,
                y: 0,
                duration: this.durationAnimation,
                delay: this.delayAnimation,
                onComplete: () => {
                    this.cityLayout.portfolio.openSection();
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
        this._removeClassActiveSection();
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

    _removeClassActiveSection() {
        this.cityLayout.portfolio.closeSection();
    }

    _createButton(innerText) {
        const button = document.createElement('button');
        button.append(document.createTextNode(innerText));
        button.classList.add('buttons');

        return button;
    }
}
