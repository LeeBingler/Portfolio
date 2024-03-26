import gsap from "gsap";

import World from "../World";

export default class ButtonMode {
    constructor() {
        this.world = new World();
        this.renderMain = this.world.renderMain;

        this.displayScene = 0;

        this._createMainDiv();
        this._createButton();
        this._createEventListener();
    }

    _createMainDiv() {
        this.mainDiv = document.createElement('div');
        this.mainDiv.classList.add('switch-holder');

        document.body.appendChild(this.mainDiv);
    }

    _createButton() {
        this.button = document.createElement('button');
        this.button.append('Button')
    

        this.mainDiv.appendChild(this.button);
    }

    _createEventListener() {
        this.button.addEventListener('click', () => {
            this.displayScene = this.displayScene === 0 ? 1 : 0;
            gsap.to(this.renderMain.material.uniforms.uTransition, 
                { value: this.displayScene, duration: 2, ease: 'power.in' }
            );
        })
    }
}
