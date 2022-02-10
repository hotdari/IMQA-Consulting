// const CommonActionView = require("../common/CommonActionView");
// const ActionViewUtil = require("../common/ActionViewUtil");

import {CommonActionView} from "../common/CommonActionView"
import {ActionViewUtil} from "../common/ActionViewUtil"
import {ActionViewContext} from "@/layer/common/ActionViewContext";
import {ProjectDao} from "@/../model/DB/Project"
import {ProjectElectronModel} from "../../../model/Electron/ProjectElectronModel"

/**
 *
 */
export class ProjectActionView extends CommonActionView {
  actionView = CommonActionView;
  _myActionView = null;
  childAction = null;
  constructor() {
    super();
  }

  static newInstance() {
    return new ProjectActionView();
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

  nextAction(context, txId){
    debugger
    context.setBean(txId, this.nextActionObj);
    this.nextActionObj.doAction(context, txId)
  }

  setNextAction(obj){
    this.nextActionObj = obj;
    return this;
  }

  makeProject() {
    let vm = this;
    const makeProjectChildAction = [
      this.actionView.innerAction(function (context, txId) {
        console.log("컨설팅 이름 받아오기", context)
        // 컨설팅이름 받아오기

        //화면 input 출력
        context.getVue().$emit('message',
          {
            user: "IMQA Bot",
            time: "오후 1:11",
            body: "<p>컨설팅 진행을 도와드리겠습니다</p><p>컨설팅명을 입력해주세요</p>",
            action: "<button data-event='startConsulting' data-txId='" + txId +"' class='btn btn-primary btn-sm'>네. 시작할게요</button><button data-event='cancelConsulting' data-txId='" + txId +"' class='btn btn-secondary btn-sm'>취소합니다</button>"
          })

        return this.nextActionObj
      }),
      this.actionView.innerAction(function (context, txId) {

        context.getVue().$emit('message',
          {
            user: "사용",
            time: "오후 1:11",
            body: "<p>2022 02 03 컨설팅 진행 제목</p>",
          })

        console.log("프로젝트명 받아오기", context)
        // 서버에서 프로젝트 리스트 받아오기

        //화면 input 출력
        context.getVue().$emit('message',
          {
            		user: "IMQA Bot",
            		time: "오후 1:11",
            		body: "<p>컨설팅 진행을 도와드리겠습니다</p><p>아리따움 프로젝트의 컨설팅을 시작하시겠습니까?</p>",
            		action: "<button data-event='startConsulting' data-txId='" + txId +"' class='btn btn-primary btn-sm'>네. 시작할게요</button><button data-event='cancelConsulting' data-txId='" + txId +"' class='btn btn-secondary btn-sm'>취소합니다</button>"
          })
        return this.nextActionObj
      }),
      this.actionView.innerAction(function (context, txId) {
        console.log("앱버전 정보 받아오기", context)
        // 앱버전 정보 받아오기
        ProjectElectronModel.newInstance().getAppVersion().then(function(data){
          console.log(data);
        })

        // 화면 input 출력
        context.getVue().$emit('message',
          {
            user: "IMQA Bot",
            time: "오후 1:11",
            body: "<p>앱버전을 선택해주세요.</p>",
            action: "<select data-event='selectVersion' data-txId='" + txId +"'>" +
              "<option value='1.0'>1.0</option>" +
              "<option value='2.0'>2.0</option>" +
              "</select>" +
              "<div class='mt-1'><button data-event='startVersion' data-txId='" + txId +"' class='btn btn-primary btn-sm'>선택된 버전으로 시작합니다.</button><button data-event='cancelVersion' class='btn btn-secondary btn-sm'>취소합니다</button></div>"
          })

        return this.nextActionObj
      }),
      this.actionView.innerAction(function (context, txId) {
        context.getVue().$emit('message',
          {
            		user: "사용자",
            		time: "오후 1:12",
            		body: "<p>1.0 버전으로 시작합니다.</p>",
          })


        console.log("날짜 정보 받아오기", context)
        // 날짜 정보 받아오기

        // 화면 input 출력짜
        // 화면 input 출력
        context.getVue().$emit('message',
          {
            		user: "IMQA Bot",
            		time: "오후 1:11",
            		body: "<p>달력을 눌러 컨설팅 기간을 선택해주세요.</p>",
            		action: "<input type='date'></input><div class='mt-1'><button data-event='startDate'  data-txId='" + txId +"' class='btn btn-primary btn-sm'>선택된 기간으로 시작합니다.</button><button data-event='cancelDate'  data-txId='" + txId +"' class='btn btn-secondary btn-sm'>취소합니다</button></div>"
          })
        return this.nextActionObj
      }),
      this.actionView.innerAction(function (context, txId) {

        console.log("프로젝트 생성", context)

        context.getVue().$emit('message',
          {
            user: "사용자",
            time: "오후 1:12",
            body: "<p>프로젝트 생성을 시작합니다</p>",
          })

        let dao = new ProjectDao();
        dao.insertProject({app_id:'123', project_name:'123', message : 'sbdfkj'}).then(key=>{
         context.getVue().$emit('message',
           {
             user: "사용자",
             time: "오후 1:12",
             body: "<p>프로젝트 생성이 완료되었습니다 " + key + "</p>",
           })

          context.getBean(txId).nextAction(context, txId);
        })
      }),
   ];

    this.childAction = ActionViewUtil.combineInnerView(makeProjectChildAction);

    return this;
  }


}
