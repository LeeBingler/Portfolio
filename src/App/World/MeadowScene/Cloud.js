import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js"

import App from "../../App.js";

import vertexShader from "../../shaders/cloud/vertex.glsl";
import fragmentShader from "../../shaders/cloud/fragment.glsl";

export default class Cloud {
    constructor(scene) {
        this.app = new App();
        this.resources = this.app.resources;
        this.scene = scene;

        this.nbCloud = 800;

        this._addFog();

        this._initTexture();

        this._initGeometry();
        this._initMaterial();
        this._initCloud();
    }

    _addFog() {
        this.fog = new THREE.Fog( 0x4584b4, - 100, 3000 );
        this.scene.fog = this.fog;
    }

    _initTexture() {
        this.texture = this.app.resources.items.TextureCloud;
        this.texture.magFilter = THREE.LinearMipMapLinearFilter;
		this.texture.minFilter = THREE.LinearMipMapLinearFilter;
        this.texture.colorSpace = THREE.SRGBColorSpace;
    }

    _initGeometry() {
        this.geometry = new THREE.BufferGeometry();
        const planeGeo = new THREE.PlaneGeometry(10, 10);
        const planeObj = new THREE.Object3D();
        const geometries = [];

        for (let i = 0; i < this.nbCloud; i++) {
            planeObj.position.x = (Math.random() - 0.5) * 220;
            planeObj.position.y = Math.random() * 15;
            planeObj.position.z = Math.random() * 50;
            planeObj.rotation.z = Math.random() * Math.PI;
            planeObj.scale.x = planeObj.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
            planeObj.updateMatrix()
    
            const clonedPlaneGeo = planeGeo.clone();
            clonedPlaneGeo.applyMatrix4(planeObj.matrix);

            geometries.push(clonedPlaneGeo);
        }

        this.geometry = BufferGeometryUtils.mergeGeometries(geometries);
    }

    _initMaterial() {
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            uniforms: {
                uTime: new THREE.Uniform(0),

                uTexture: new THREE.Uniform(this.texture),
                fogColor: new THREE.Uniform(this.fog.color),
                fogNear: new THREE.Uniform(this.fog.near),
                fogFar: new THREE.Uniform(this.fog.far),
            }
        });
    }

    _initCloud() {
        this.instance = new THREE.Mesh(this.geometry, this.material);

        this.instance.position.z = -80;
        this.instance.position.y = 40;
    }

    update(elapsedTime) {
        this.material.uniforms.uTime.value = elapsedTime;
    }
}
