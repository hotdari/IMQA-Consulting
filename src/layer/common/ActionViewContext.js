
export class ActionViewContext {

    static _single;

    constructor() {
        this._beans = {}
    }

    static getInstance() {
        if(!this._single) {
            this._single = new ActionViewContext();
        }
        return this._single
    }

    setBean(beanName, bean) {
        this._beans[beanName] = bean
    }
    getBean(beanName) {
        console.log(beanName)
        return this._beans[beanName]
    }

}
