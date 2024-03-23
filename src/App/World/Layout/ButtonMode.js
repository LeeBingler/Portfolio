let buttonModeInstance = null

export default class ButtonMode {
    constructor() {
        if (buttonModeInstance) {
            return buttonModeInstance;
        }
        buttonModeInstance = this;

        this._createMainDiv();
        this._createButton();
    }

    _createMainDiv() {
        this.mainDiv = document.createElement('div');
        this.mainDiv.classList.add('switch-holder');

        document.body.appendChild(this.mainDiv);
    }

    _createButton() {
        this.button = document.createElement('button');
        this.button.append('Button')

        this.mainDiv.appendChild(this.button);
    }
}
