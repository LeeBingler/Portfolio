export default class CvButton {
    constructor() {
        this._initButton();
    }

    _initButton() {
        this.button = document.createElement('a');
        this.button.target = "_blank";
        this.button.href = "/CV_Portfolio_Lee.pdf"

        this.button.append(document.createTextNode("My CV"));
        this.button.classList.add('buttons');
        this.button.classList.add(`buttons-cv`);

        document.body.appendChild(this.button);
    }
}
