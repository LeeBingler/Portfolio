import App from '../App.js';

import Layout from './Layout/Layout.js';
import CityScene from './CityScene/CityScene.js';
import MeadowScene from './MeadowScene/MeadowScene.js';
import RenderMain from './RenderMain.js';

let instance = null

export default class World {
    constructor() {
        if (instance) {
            return instance;
        }
        instance = this;

        this.app = new App();
        this.resources = this.app.resources;

        this.resources.on('ready', () => {
            this.cityScene = new CityScene();
            this.meadowScene = new MeadowScene();
            this.renderMain = new RenderMain(this.meadowScene, this.cityScene);
            this.layout = new Layout();

            this.cityScene.CityScene.add(this.layout.instance);

            this.ready = true;
        });
    }

    onPointerMove() {
        if (this.ready) {
            this.layout.onPointerMove();
        }
    }
    
    resize() {
        if (this.ready) {
            this.renderMain.resize();
            this.cityScene.resize();
            this.meadowScene.resize();
        }
    }

    update(elapsedTime, deltaTime) {
        if (this.ready) {
            this.renderMain.update(elapsedTime, deltaTime);
            this.layout.update(elapsedTime);
        }
    }
}
