import * as THREE from 'three';

export default class CityLayout {
    constructor() {
        this.section = document.createElement('section');
    }

    addSection() {
        document.body.appendChild(this.section);
    }
}
