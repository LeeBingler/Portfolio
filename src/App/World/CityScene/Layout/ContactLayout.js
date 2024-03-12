import App from '../../../App.js'

export default class ContactLayout {
    constructor() {
        this.app = new App();
        
        this._initSection();
    }

    _initSection() {
        this.section = document.createElement('section');
        this.section.classList.add('section-info');
        this.section.classList.add('contact-section');
    }

    addActiveOnSection() {
        this.section.classList.add('active');
    }

    removeActiveOnSection() {
        this.section.classList.remove('active');
    }
}
