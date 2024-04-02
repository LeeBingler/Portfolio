import App from '../../App.js'

export default class PortfolioLayout {
    constructor() {
        this.app = new App();

        this._initSection();
        this._initEvent();
    }

    _initSection() {
        this.section = document.querySelector('.portfolio-section');
        this.title = document.querySelector('.portfolio-section .title');
        this.backButton = document.querySelector('.back-button');
        this.holder = document.querySelector('.portfolio-holder');
        this.portfolio = this.getProject('portfolio');
    }

    _initEvent() {
        this.backButton.addEventListener('click', () => {
            this.holder.style.display = "block";
            this.title.style.display = "flex";
            this.backButton.style.display = "none";
            this.current.popup.style.display = "none";
            this.current = null;
        })
        
        this.setEvent(this.portfolio);
    }

    getProject(str) {
        const project = document.querySelector(`.${str}-project`);
        const popup = document.querySelector(`.${str}-popup`);

        return {project, popup};
    }

    setEvent(obj) {
        obj.project.addEventListener('click', () => {
            this.holder.style.display = "none";
            this.title.style.display = "none";
            this.backButton.style.display = "block";
            obj.popup.style.display = "block";
            this.current = obj;
        })
    }

    addActiveOnSection() {
        this.section.classList.add('active');
    }

    removeActiveOnSection() {
        this.section.classList.remove('active');
    }
}
