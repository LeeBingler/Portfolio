import gsap from 'gsap';

import App from '../../App.js';

export default class ButtonsNavigation {
    constructor() {
        this.app = new App();
        this.camera = this.app.camera;
        this.durationAnimation = 1.5;

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

        this.homeBtn.addEventListener('click', () => {
            gsap.to(this.camera.instance.position, {
                x: 0,
                y: 0,
                z: 0,
                duration: this.durationAnimation
            });
            gsap.to(this.camera.instance.rotation, {
                x: Math.PI * 0.07,
                y: 0,
                duration: this.durationAnimation
            });
        });

        this.section.append(this.homeBtn);
    }

    _createAboutButton() {
        this.aboutBtn = this._createButton('About');
        this.aboutBtn.classList.add('buttons-about');

        this.aboutBtn.addEventListener('click', () => {
            gsap.to(this.camera.instance.position, {
                x: -5.8,
                y: 0.15,
                z: -22.6,
                duration: this.durationAnimation
            });
            gsap.to(this.camera.instance.rotation, {
                x: 0,
                y: Math.PI * 0.4,
                duration: this.durationAnimation
            });
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
                duration: this.durationAnimation
            });
            gsap.to(this.camera.instance.rotation, {
                x: 0,
                y: Math.PI * -0.55,
                duration: this.durationAnimation
            });
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
                duration: this.durationAnimation
            });
            gsap.to(this.camera.instance.rotation, {
                x: Math.PI * 0.07,
                y: 0,
                duration: this.durationAnimation
            });
        });

        this.section.append(this.portfolioBtn);
    }

    _createButton(innerText) {
        const button = document.createElement('button');
        button.append(document.createTextNode(innerText));
        button.classList.add('buttons');

        return button;
    }
}
