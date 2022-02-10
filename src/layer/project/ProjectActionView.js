const CommonActionView = require("../common/CommonActionView");
const ActionViewUtil = require("../common/ActionViewUtil");

/**
 *
 */
module.exports = class ProjectActionView extends CommonActionView {
  actionView = CommonActionView;
  _myActionView = null;
  childAction = null;
  constructor() {
    super();
  }

  static newInstance() {
    return new ProjectActionView();
  }


  doAction(){
    if(!this._myActionView) {
      this._myActionView = this.childAction;
    }
    this._myActionView.doAction();
  }

  nextAction(){}

  setNextAction(obj){
    this.nextActionObj = nextAction;
    return this;
  }

  makeProject() {

    const makeProjectChildAction = [
      this.actionView.innerAction(function (context) {
        console.log("컨설팅 이름 받아오기", context)
        // 컨설팅이름 받아오기

        //화면 input 출력

      }),
      this.actionView.innerAction(function (context) {
        console.log("프로젝트명 받아오기", context)
        // 서버에서 프로젝트 리스트 받아오기
          projectModel.getProjectList();

        //화면 input 출력
          printView("printView://txId=12312312&");
      }),
      this.actionView.innerAction(function (context) {
        console.log("앱버전 정보 받아오기", context)
        // 앱버전 정보 받아오기

        // 화면 input 출력
      }),
      this.actionView.innerAction(function (context) {
        console.log("날 정보 받아오기", context)
        // 날 정보 받아오기

        // 화면 input 출력짜
        view.send(messsage)
      }),
      this.actionView.innerAction(function (context) {
        this.param.appVersion = context.appversion;
        console.log("프로젝트 생성", context)
          projectModel.makeProject(this.param);


      }),
   ];

    this.childAction = ActionViewUtil.combineInnerView(makeProjectChildAction);

    return this;
  }


}

class MakeProjectAction extends CommonActionView {

  constructor(parentAction) {
    super();
    this.parentAction = parentAction;
  }

  doAction() {

  }

  get parentAction() { return this._parentAction; }
  set parentAction(parentAction){ this._parentAction = parentAction;  }


}
