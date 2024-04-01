import * as THREE from "three";

import App from "../App";

import vertexShader from "../shaders/transitions/vertex.glsl"
import fragmentShader from "../shaders/transitions/fragment.glsl"
import World from "./World";

export default class RenderMain {
    constructor() {
        this.app = new App();
        this.renderer = this.app.renderer;
        this.sizes = this.app.sizes;
        this.resources = this.app.resources;
        this.mainScene = this.app.scene;
        this.camera = this.app.camera;
        this.debug = this.app.debug;

        this.world = new World();
        this.scene1 = this.world.meadowSceneNight;
        this.scene2 = this.world.meadowSceneDay;

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('RenderMain');
        }

        this._initGeometry();
        this._initMaterial();
        this._initPlane();
    }

    _initGeometry() {
        this.geometry = new THREE.PlaneGeometry(1, 1);
    }

    _initMaterial() {
        const perlinTexture = this.resources.items.TexturePerlin;
        perlinTexture.wrapS = THREE.RepeatWrapping;
        perlinTexture.wrapT = THREE.RepeatWrapping;

        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTextureMix: new THREE.Uniform(perlinTexture),

                uTextureScene1: new THREE.Uniform(this.scene1.fbo.texture),
                uTextureScene2: new THREE.Uniform(this.scene2.fbo.texture),
                uTransition: new THREE.Uniform(0),
                uThreshold: new THREE.Uniform(0.2),
            }
        })

        if (this.debug.active) {
            this.debugFolder.add(this.material.uniforms.uThreshold, 'value').min(0).max(10).step(0.1).name('uThreshold');
        }
    }

    _initPlane() {
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane.scale.set(this.sizes.width, this.sizes.height, 1);

        this.mainScene.add(this.plane);
    }

    resize() {
        this.plane.scale.set(this.sizes.width, this.sizes.height, 1);
    }

    update(elapsedTime, deltaTime) {
        if (this.material.uniforms.uTransition.value === 0) {
            this.scene1.render(false, elapsedTime, deltaTime);
        } else if (this.material.uniforms.uTransition.value === 1) {
            this.scene2.render(false, elapsedTime, deltaTime);
        } else {
            this.scene1.render(true, elapsedTime, deltaTime);
            this.scene2.render(true, elapsedTime, deltaTime);

            this.renderer.instance.setRenderTarget(null);
            this.renderer.instance.render(this.mainScene, this.camera.orthographic);
        }
    }
}
