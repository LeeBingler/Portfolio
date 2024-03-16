import * as THREE from 'three';

import App from '../../App.js'

export default class Cloud {
    constructor() {
        this.app = new App();
        this.debug = this.app.debug;

        this._initCloud()
    }

    _initCloud() {
        console.log('cloud init')
    }
}
