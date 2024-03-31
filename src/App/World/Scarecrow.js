import gsap from "gsap";

import App from "../App.js";

export default class Scarecrow {
    constructor(model) {
        this.model = model;
        this.position = this.model.position.clone()
        this.rotation = this.model.rotation.clone();

        this.app = new App();
        this.raycaster = this.app.raycaster;
        this.raycaster.pushToTestIntersect(this.model, 'scarecrow');

        this.countClick = 0;

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


        this.tlRespawn = gsap.timeline({paused: true, onComplete: () => this.countClick = 0 });
        // jump
        this.tlRespawn.to(this.model.position, {
            y: "+=0.5",
            x: "+=0.1",
            z: "+=0.1",
            duration: 0.15,
        });
        this.tlRespawn.to(this.model.rotation, {
            y: -Math.PI * 0.1,
            duration: 0.15,
        }, "<");

        // fall
        this.tlRespawn.to(this.model.position, {
            x: "+=1",
            y: "-=0.7",
            duration: 1,
        }, ">")
        this.tlRespawn.to(this.model.rotation, {
            y: -Math.PI * 0.2,
            z: -Math.PI,
            duration: 1,
        }, "<");
        
        // respawn
        this.tlRespawn.to(this.model.position, {
            x: this.position.x,
            y: this.position.y - 1.1,
            z: this.position.z,
            duration: 0,
        });
        this.tlRespawn.to(this.model.rotation, {
            x: this.rotation.x,
            y: this.rotation.y,
            z: this.rotation.z,
            duration: 0,
        }, "<");
        this.tlRespawn.to(this.model.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0
        }, "<");

        // go up
        this.tlRespawn.to(this.model.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1.3
        });
        this.tlRespawn.to(this.model.position, {
            y: this.position.y,
            duration: 1.3,
        }, "<")
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

    respawnAnimation() {
        this.tlRespawn.seek(0);
        this.tlRespawn.play();
    }

    onClick() {
        const intersect = this.raycaster.getItemIntersect(this.model.uuid);

        if (intersect) {
            this.countClick++;
            if (this.countClick > 8) {
                return;
            }

            if (this.countClick === 8) {
                this.respawnAnimation();
            } else {
                this.moveAnimation();
            }
        }
    }
}
