import gsap from "gsap";

import World from "../World";

export default class ButtonMode {
    constructor() {
        this.world = new World();
        this.renderMain = this.world.renderMain;

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
        const onComplete = () => {
            const dummy = this.renderMain.material.uniforms.uTextureScene1.value;

            this.renderMain.material.uniforms.uTextureScene1.value = this.renderMain.material.uniforms.uTextureScene2.value;
            this.renderMain.material.uniforms.uTextureScene2.value = dummy;
            this.renderMain.material.uniforms.uTransition.value = 0;

            this.button.disabled = false;
        }

        this.button.addEventListener('click', () => {
            this.button.disabled = true;
            
            gsap.fromTo(this.renderMain.material.uniforms.uTransition, 
                { value: 0 },
                { value: 1, duration: 2, ease: 'power.in', onComplete: onComplete}
            );
        })
    }
}
