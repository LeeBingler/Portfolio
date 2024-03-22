import * as THREE from "three";
import gsap from "gsap";

import App from "../App";

import vertexShader from "../shaders/transitions/vertex.glsl"
import fragmentShader from "../shaders/transitions/fragment.glsl"
import ButtonMode from "./Layout/ButtonMode";

export default class RenderMain {
    constructor(scene1, scene2) {
        this.app = new App();
        this.sizes = this.app.sizes;
        this.resources = this.app.resources;

        this.mainScene = this.app.scene;
        this.scene1 = scene1;
        this.scene2 = scene2;

        this.mode = false;

        this._initPlane();
        this._initChangeButton();
    }

    _initPlane() {
        const perlinTexture = this.resources.items.TexturePerlin;
        perlinTexture.wrapS = THREE.RepeatWrapping;
        perlinTexture.wrapT = THREE.RepeatWrapping;

        this.geometry = new THREE.PlaneGeometry(1, 1);
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTextureMix: new THREE.Uniform(perlinTexture),

                uTextureScene1: new THREE.Uniform(this.scene1.fbo.texture),
                uTextureScene2: new THREE.Uniform(this.scene2.fbo.texture),
                uTransition: new THREE.Uniform(0),
            }
        })

        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane.scale.set(this.sizes.width, this.sizes.height, 1);

        this.mainScene.add(this.plane);
    }

    _initChangeButton() {
        this.buttonMode = new ButtonMode();

        this.buttonMode.button.addEventListener('click', () => {
            this.changeScene(this.buttonMode.input.checked);
        })
    }

    changeScene(mode) {
        gsap.fromTo(this.plane.material.uniforms.uTransition,
            { value: mode ? 0 : 1 },
            { value: mode ? 1 : 0, duration: 2}
        )
    }

    resize() {
        this.plane.scale.set(this.sizes.width, this.sizes.height, 1);
    }

    update(elapsedTime, deltaTime) {
        this.scene1.render(true, elapsedTime, deltaTime);
        this.scene2.render(true, elapsedTime, deltaTime);
    }
}
