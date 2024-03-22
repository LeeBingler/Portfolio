import * as THREE from 'three';

import App from "../../App.js"

import vertexShaderGrass from '../../shaders/grass/vertex.glsl'
import fragmentShaderGrass from '../../shaders/grass/fragment.glsl'

export default class Grass {
    constructor(instancesCount) {
        this.instancesCount = instancesCount;

        this.app = new App();
        this.resources = this.app.resources;
        
        this._initInfoBlade();
        this._initGeometry();
        this._initMaterial();
        this._createInstance();
    }

    _initInfoBlade() {
        //const VERTICE_BLADE = 5;
        const BLADE_WIDTH = 0.01;
        const BLADE_HEIGHT = 0.1;

        this.positionVertices = [];
        this.indexs = [0, 1, 2, 1, 3, 2, 2, 3, 4];
        this.uvs = [
            0.0, 0.0,
            1.0, 0.0,
            0.0, 0.5,
            1.0, 0.5,
            0.5, 1.0,
        ]

        this.positionVertices.push(-(BLADE_WIDTH / 2), 0, 0);
        this.positionVertices.push(BLADE_WIDTH / 2, 0, 0);
        this.positionVertices.push(-(BLADE_WIDTH / 2), BLADE_HEIGHT / 2, 0);
        this.positionVertices.push(BLADE_WIDTH / 2, BLADE_HEIGHT / 2, 0);
        this.positionVertices.push(0, BLADE_HEIGHT, 0); 
    }

    _initGeometry() {
        const BLADE_HEIGHT_VARIATION = 0.6;

        const positionBlade = [];
        const angle = [];
        const heigthVariation = [];
    
        for (let i = 0; i < this.instancesCount; i++) {
            const i3 = i * 3;

            positionBlade[i3] = (Math.random() - 0.5);
            positionBlade[i3 + 1] = 0;
            positionBlade[i3 + 2] = (Math.random() - 0.5);

            angle.push(Math.random() * 180);

            heigthVariation.push((Math.random() - 0.5) * BLADE_HEIGHT_VARIATION + 1);
        }

        this.geometry = new THREE.InstancedBufferGeometry();
        this.geometry.instanceCount = this.instancesCount;

        this.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(this.positionVertices), 3));
        this.geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(this.uvs), 2))
        this.geometry.setAttribute('aPositionBlade', new THREE.InstancedBufferAttribute(new Float32Array(positionBlade), 3));
        this.geometry.setAttribute('aAngle', new THREE.InstancedBufferAttribute(new Float32Array(angle), 1));
        this.geometry.setAttribute('aHeigth', new THREE.InstancedBufferAttribute(new Float32Array(heigthVariation), 1));
        this.geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(this.indexs), 1));
    }

    _initMaterial() {
        const perlinTexture = this.resources.items.TexturePerlin;
        perlinTexture.wrapS = THREE.RepeatWrapping;
        perlinTexture.wrapT = THREE.RepeatWrapping;

        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShaderGrass,
            fragmentShader: fragmentShaderGrass,
            side: THREE.DoubleSide,
            uniforms: {
                uTime: new THREE.Uniform(0),

                uPerlin: new THREE.Uniform(perlinTexture)
            }
        });
    }

    _createInstance() {
        this.instance = new THREE.Mesh(this.geometry, this.material);
    }

    update(elapsedTime) {
        this.material.uniforms.uTime.value = elapsedTime;
    }
}
