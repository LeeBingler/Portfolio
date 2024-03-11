import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export default class HTMLLayoutObj3D {
    constructor() {
        this.instance = null;
    }

    createLayoutElem(
        params = {
            tag : 'div', 
            className : 'container', 
            childElement : '<h1>Empty</h1>', 
            pos : new THREE.Vector3(), 
            rot : new THREE.Euler()
        })
    {
        const { tag, className, childElement, pos, rot } = params;
        const element = document.createElement(tag);
        element.classList.add(className);
        element.style.fontSize = '10rem';
        element.style.background = "white";

        if (typeof childElement == 'string') {
            element.innerHTML = childElement;
        } else {
            element.append(childElement);
        }

        const object = new CSS3DObject(element);
        object.scale.setScalar(0.001);
        object.position.copy(pos);
        object.rotation.copy(rot);

        return object;
    }
}
