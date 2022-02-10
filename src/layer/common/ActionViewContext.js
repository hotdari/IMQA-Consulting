
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
      bean.setContext = this;
    }
    getBean(beanName) {
        console.log(beanName)
        return this._beans[beanName]
    }

    setVue(vue) {
      this._vue = vue;
    }

    getVue(){
      return this._vue;
    }

}
