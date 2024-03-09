export default class PortfolioLayout {
    constructor() {
        this._initSection();
    }

    _initSection() {
        this.section = document.createElement('section');
        this.section.classList.add('portfolio-container');

        this.section.append(document.createTextNode('Portfolio Layout'));

        document.body.append(this.section);
    }

    openSection() {
        if (!this.section) return;

        this.section.classList.add('active');
    }

    closeSection() {
        if (!this.section) return;

        this.section.classList.remove('active');
    }
}
