let buttonModeInstance = null

export default class ButtonMode {
    constructor() {
        if (buttonModeInstance) {
            return buttonModeInstance;
        }
        buttonModeInstance = this;

        this.nightMode = true;

        this._createMainDiv();
        this._createButton();
    }

    _createMainDiv() {
        this.mainDiv = document.createElement('div');
        this.mainDiv.classList.add('switch-holder');

        document.body.appendChild(this.mainDiv);
    }

    _createButton() {
        this.button = document.createElement('label');
        this.button.classList.add('switch');


        this.input = document.createElement('input');
        this.div = document.createElement('div');

        this.input.type = "checkbox";
        this.div.classList.add('slider');

        this.button.append(this.input, this.div);

        this.mainDiv.appendChild(this.button);
    }
}
