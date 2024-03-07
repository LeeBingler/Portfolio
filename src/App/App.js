import * as THREE from 'three';

import Renderer from './Renderer';
import Camera from './Camera';
import Debug from './Utils/Debug';
import Resources from './Utils/Resources';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import MyRaycaster from './Raycaster.js';
import World from './World/World';

import sources from './sources';
import Mouse from './Utils/Mouse';

let instance = null;

export default class App {
    constructor(canvas) {
        if (instance) {
            return instance;
        }
        instance = this;

        // Options
        this.canvas = canvas;

        // Setup
        this.debug = new Debug();
        this.sizes = new Sizes();
        this.mouse = new Mouse(this.sizes);
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.resources = new Resources(sources);
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.raycaster = new MyRaycaster();
        this.world = new World();

        this.sizes.on('resize', () => {
            this._resize();
        });

        this.time.on('tick', () => {
            this._update();
        });

        this.mouse.on('pointermove', () => {
            this._onPointerMove();
        })
    }

    _onPointerMove() {
        this.camera.onPointerMove();
        this.world.onPointerMove();
    }

    _resize() {
        this.renderer.resize();
        this.camera.resize();
    }

    _update() {
        this.camera.update();
        this.renderer.update();
        this.world.update(this.time.elapsed, this.time.delta);
    }
}
