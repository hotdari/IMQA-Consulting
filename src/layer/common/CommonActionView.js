/**
 *
 */
export class CommonActionView {

  nextActionObj = null;

  constructor() {

  }

  static newInstance() {
  }

  static innerAction(fn) {
    let result = new CommonActionView();
    result.doAction = fn;
    return result;
  }


  setNextAction(nextAction) {
    this.nextActionObj = nextAction;
    return this;
  }

  doAction(){}

  nextAction(){
    return this.nextAction();
  }


  setPrintAction(param) {
    //todo
  }

  set childAction(childAction) {this._childAction = childAction }
  get childAction() {return this._childAction}

  setContext(context) {
    this.context = context;
  }


}

