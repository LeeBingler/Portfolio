import gsap from "gsap";

import App from "./App.js";

export default class Preloader {
    constructor() {
        this.app = new App();
        this.resources = this.app.resources;

        this.currentPercentage = {value: 0};

        this._setPreloader();

        this.resources.on('load', () => {
            this.onLoad();
        })

        this.resources.on('ready', () => {
            this.onReady();
        })
    }

    _setPreloader() {
        this.preloader = document.createElement('div');
        this.preloader.classList.add("preloader");

        this.numbers = document.createElement('div');
        this.numbers.innerText = "0%";
        this.numbers.classList.add('percentage-load');
        this.preloader.appendChild(this.numbers);

        document.body.appendChild(this.preloader);
    }

    onLoad() {
        const progressRatio = this.resources.loaded / this.resources.toLoad * 100;
        
        gsap.to(this.currentPercentage, {
            value: progressRatio,
            duration: 1,
            onUpdate: () => {
                const percentage = Math.round(this.currentPercentage.value);
                this.numbers.innerText = `${percentage}%`;
            }
        });
    }

    onReady() {
        const destroy = () => {
            this.numbers.remove();
            this.preloader.remove();
        }

        gsap.to(this.preloader, {
            yPercent: -100,
            duration: 1.2,
            delay: 1.2,
            onComplete: destroy,
        })
    }
}
