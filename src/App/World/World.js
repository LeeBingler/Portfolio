import App from '../App.js';

import Layout from './Layout/Layout.js';
import CityScene from './CityScene/CityScene.js';
import MeadowScene from './MeadowScene/MeadowScene.js';
import RenderMain from './RenderMain.js';

export default class World {
    constructor() {
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
        this.cityScene.resize();
        this.meadowScene.resize();
        this.renderMain.resize();
    }

    update(elapsedTime, deltaTime) {
        if (this.ready) {
            this.renderMain.update(elapsedTime, deltaTime);
            this.layout.update(elapsedTime);
        }
    }
}
