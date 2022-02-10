/**
 *
 */
module.exports = class CommonActionView {

  nextActionObj = null;

  constructor() {

  }

  static newInstance() {
  }

  static innerAction(fn) {
    let result = new CommonActionView();
    CommonActionView.doAction = fn;
    return result;
  }


  setNextAction(nextAction) {
    this.nextActionObj = nextAction;
    return this;
  }

  doAction(){}

  nextAction(){}

  setNextAction(){
    this.nextActionObj = nextAction;
    return this;
  }

  setPrintAction(param) {
    //todo
  }

  set childAction(childAction) {this._childAction = childAction }
  get childAction() {return this._childAction}



}

