import App from '../../../App.js'

export default class AboutLayout {
    constructor() {
        this.app = new App();
        
        this._initSection();
    }

    _initSection() {
        this.section = document.querySelector('.about-section');
    }

    addActiveOnSection() {
        this.section.classList.add('active');
    }

    removeActiveOnSection() {
        this.section.classList.remove('active');
    }
}
