import App from '../App.js';

import Layout from './Layout/Layout.js';
import MeadowSceneNight from './MeadowSceneNight/MeadowSceneNight.js'
import MeadowSceneDay from './MeadowSceneDay/MeadowSceneDay.js';
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
            this.meadowSceneNight = new MeadowSceneNight();
            this.meadowSceneDay = new MeadowSceneDay();
            this.renderMain = new RenderMain(this.meadowScene, this.cityScene);
            this.layout = new Layout();

            this.meadowSceneNight.scene.add(this.layout.instance);
            this.meadowSceneDay.scene.add(this.layout.instance.clone());
            this.ready = true;
        });
    }

    onClick() {
        if (this.ready) {
            this.meadowSceneNight.scarecrow.onClick();
        }
    }

    onPointerMove() {
        if (this.ready) {
            this.layout.onPointerMove();
        }
    }
    
    resize() {
        if (this.ready) {
            this.renderMain.resize();
            this.meadowSceneDay.resize();
            this.meadowSceneNight.resize();
        }
    }

    update(elapsedTime, deltaTime) {
        if (this.ready) {
            this.renderMain.update(elapsedTime, deltaTime);
            this.layout.update(elapsedTime);
        }
    }
}
