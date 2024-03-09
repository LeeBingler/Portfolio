export default class AboutLayout {
    constructor() {
        this._initSection();
    }

    _initSection() {
        this.PerspectiveWrapper = document.createElement('section');
        this.PerspectiveWrapper.classList.add('about-wrapper');

        this.section = document.createElement('div');
        this.section.classList.add('about-container');

        this.section.append(document.createTextNode('About container'));

        this.PerspectiveWrapper.append(this.section);

        document.body.append(this.PerspectiveWrapper);
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
