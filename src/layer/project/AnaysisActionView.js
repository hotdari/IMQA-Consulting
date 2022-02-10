import {CommonActionView} from "../common/CommonActionView"
import {ActionViewUtil} from "../common/ActionViewUtil"

/**
 *
 */
export class AnalysisActionView extends CommonActionView {
  actionView = CommonActionView;
  _myActionView = null;
  childAction = null;
  constructor() {
    super();
  }

  static newInstance() {
    return new AnalysisActionView();
  }

  setView(view) {
    this._view = view;
  }

  doAction(context, txId){
    if(!this._myActionView) {
      this._myActionView = this.childAction;
    }
    this._myActionView = this._myActionView.doAction(context, txId);
  }

  nextAction(){}

  setNextAction(obj){
    this.nextActionObj = obj;
    return this;
  }

  analysisPreview() {


    /*
      1. preview
      2. 셋프리
      3. report preview
      4. start Analysis
    */
    const makeProjectChildAction = [
      this.actionView.innerAction(function (context,txId) {
        debugger
        console.log("preview", context, txId)

        context.getVue().$emit('message',
          {
            user: "Bot",
            time: "오후 1:12",
            body: "<p>2021프로젝트는 IOS이며 하이브리드로 구성되어 있습니다</p>",
          })

        return this.nextActionObj.doAction(context, txId)
      }),
      this.actionView.innerAction(function (context,txId) {
        debugger
        console.log("프리셋", context, txId)

        context.getVue().$emit('message',
          {
            user: "Bot",
            time: "오후 1:12",
            body: "<p>프리셋은 다음과 같이 구성되어 있습니다</p>" +
              "<br/><img src='file:/Users/nohsunghyun/Desktop/a.png'>",
          })

        return this.nextActionObj
      }),

   ];
    this.childAction = ActionViewUtil.combineInnerView(makeProjectChildAction);

    return this;
  }


}
