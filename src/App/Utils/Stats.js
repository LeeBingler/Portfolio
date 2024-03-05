import Stats from 'stats-js';

export default class Stat {
    constructor() {
        this.active = window.location.hash === '#debug';

        if (this.active) {
            this.instance = new Stats();
            this._addToDom();
        }
    }

    _addToDom() {
        this.instance.showPanel(0);
        document.body.appendChild(this.instance.dom);
    }

    begin() {
        if (this.active) this.instance.begin();
    }

    end() {
        if (this.active) this.instance.end();
    }
}
