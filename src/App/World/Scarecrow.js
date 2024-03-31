import gsap from "gsap";

import App from "../App.js";

export default class Scarecrow {
    constructor(model) {
        this.model = model;

        this.app = new App();
        this.raycaster = this.app.raycaster;

        this.raycaster.pushToTestIntersect(this.model, 'scarecrow');
        this._initAnimation();
    }

    _initAnimation() {
        this.tl1 = gsap.timeline({paused: true});

        this.tl1.to(this.model.rotation, {
            x: Math.PI * 0.07,
            y: Math.PI * 0.02,
            duration: 0.1
        })
        this.tl1.to(this.model.rotation, {
            x: 0,
            y: 0,
            duration: 0.1
        })


        this.tl2 = gsap.timeline({paused: true});

        this.tl2.to(this.model.rotation, {
            x: -Math.PI * 0.05,
            y: -Math.PI * 0.05,
            duration: 0.1
        })
        this.tl2.to(this.model.rotation, {
            x: 0,
            y: 0,
            duration: 0.1
        })
    }

    moveAnimation() {
        const random = Math.random();
        if (random > 0.5) {
            this.tl1.seek(0);
            this.tl1.play();
        } else {
            this.tl2.seek(0);
            this.tl2.play();
        }
    }

    onClick() {
        const intersect = this.raycaster.getItemIntersect(this.model.uuid);

        if (intersect) {
            this.moveAnimation();
        }
    }
}
