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
        this.button = document.createElement('label');
        this.button.classList.add('switch');        

        this.input = document.createElement('input');
        this.input.type = "checkbox";

        this.span = document.createElement('span');
        this.span.classList.add('slider');
        this.span.classList.add('round');

        this.button.appendChild(this.input);
        this.button.appendChild(this.span);

        this.mainDiv.appendChild(this.button);
    }

    _createEventListener() {
        this.input.addEventListener('click', () => {
            this.displayScene = this.input.checked ? 1 : 0;
            gsap.to(this.renderMain.material.uniforms.uTransition, 
                { value: this.displayScene, duration: 2, ease: 'power.in' }
            );
        })
    }
}
