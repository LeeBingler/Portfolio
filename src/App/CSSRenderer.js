import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

import App from './App.js';

export default class CSSRenderer {
    constructor(container) {
        this.app = new App();
        this.sizes = this.app.sizes;
        this.cssScene = this.app.cssScene;
        this.camera = this.app.camera;

        this.container = container;

        this._initInstance();
    }

    _initInstance() {
        this.instance = new CSS3DRenderer();
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.container.append(this.instance.domElement);
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
    }

    update() {
        this.instance.render(this.cssScene, this.camera.instance);
    }
}
