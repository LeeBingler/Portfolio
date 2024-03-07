import App from '../App.js';
import CityScene from './CityScene/CityScene.js';

export default class World {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.resources = this.app.resources;
        this.raycaster = this.app.raycaster;

        this.resources.on('ready', () => {
            this.cityScene = new CityScene();
            this.scene.add(this.cityScene.instance);
            this.ready = true;

            this.raycaster.pushToTestIntersect(this.cityScene.layout.presentationPlane, 'presentation');
        });
    }

    onPointerMove() {
        if (this.ready) {
            this.cityScene.onPointerMove();
        }
    }

    update(elapsedTime, deltaTime) {
        if (this.ready) {
            this.cityScene.update(elapsedTime);
        }
    }
}
