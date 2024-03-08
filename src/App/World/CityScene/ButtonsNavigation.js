export default class ButtonsNavigation {
    constructor() {
        this._initSection();
        this._createAboutButton();
        
        document.body.append(this.section);
    }

    _initSection() {
        this.section = document.createElement('section');
        this.section.classList.add('section');
    }

    _createAboutButton() {
        this.aboutBtn = this._createButton('About');
        this.aboutBtn.classList.add('buttons');
        this.aboutBtn.classList.add('buttons-about');

        this.section.append(this.aboutBtn);
    }

    _createButton(innerText) {
        const button = document.createElement('button');
        button.append(document.createTextNode(innerText));

        return button;
    }
}
