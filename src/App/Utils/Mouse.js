import EventEmitter from "./EventEmitter";

export default class Mouse extends EventEmitter {
    constructor(sizes) {
        super();


        this.sizes = sizes;
        this.coordRaw = {
            y: 0,
            x: 0,
        };

        this.coordNormalize = {
            y: 0,
            x: 0,
        };

        this._initMouseEvent();
    }

    _initMouseEvent() {
        window.addEventListener('pointermove', (e) => {
            this.coordRaw.x = e.clientX;
            this.coordRaw.y = e.clientY;

            this.coordNormalize.x = (e.clientX / this.sizes.width) * 2 - 1;
            this.coordNormalize.y = -(e.clientY / this.sizes.height) * 2 + 1;
            this.trigger('pointermove');
        });

        window.addEventListener('scroll', (e) => {
            this.trigger('scroll');
        })
    }

    getRawCoord() {
        return this.coordRaw;
    }

    getNormalizeCoord() {
        return this.coordNormalize;
    }
}
