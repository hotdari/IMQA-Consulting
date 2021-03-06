// const CommonActionView = require("../common/CommonActionView");
// const ActionViewUtil = require("../common/ActionViewUtil");

import { CommonActionView } from "../common/CommonActionView";
import { ActionViewUtil } from "../common/ActionViewUtil";
import { ActionViewContext } from "@/layer/common/ActionViewContext";
import sample from "@/../db/dbReportSample";
import { ReportDao } from "@/../model/DB/Report";
import { Ppt } from "@/../model/Ppt";
import { ConfigDao } from "@/../model/DB/Config";

let setup;
const config = new ConfigDao();
config.selectConfig().then(res => {
	if(res === undefined) {return;}
	setup = res;
});

/**
 *
 */
export class ReportActionView extends CommonActionView {
  actionView = CommonActionView;
  _myActionView = null;
  childAction = null;
  constructor() {
  	super();
  }

  static newInstance() {
  	return new ReportActionView();
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
  	context.setBean(txId, this.nextActionObj);
  	this.nextActionObj.doAction(context, txId);
  }

  setNextAction(obj){
  	this.nextActionObj = obj;
  	return this;
  }

  makeReport() {
  	const vm = this;
  	const makeProjectChildAction = [
  		this.actionView.innerAction(function (context, txId) {
  			const dao = new ReportDao();
  			const ppt = new Ppt(setup);

  			// 레포팅 시작
  			console.log("컨설팅 완료 -> 레포팅 시작 메시지 :: ", context);

  			//화면 input 출력
  			context.getVue().$emit("message",
  				{
  					user: "IMQA Bot",
  					time: "오후 1:11",
  					body: "<p>모든 컨설팅이 완료되었습니다. 레포팅을 진행합니다.</p>"
  				});

  			// report table에 저장
  			dao.insertReport({
  				project_id: 32,
  				title: "아리따움 1.0v",
  				desc: "설명문",
  				content: sample
  			}).then(result => {
  				dao.selectReport({ report_id: result }).then(result => {
  					ppt.convertPptx(result).then(r => {
  						context.getVue().$emit("message",
  							{
  								user: "IMQA Bot",
  								time: "오후 1:11",
  								body: "<p>레포팅 파일 생성이 완료되었습니다. 확인해주세요.</p>",
  								action: "<div class='mt-3'><button data-event='downloadReport' data-txId='" + txId + "' class='btn btn-primary btn-sm'>DownLoad</button></div>"
  							});
  					});
  				});
  			});

  			return ppt;
  		})
  	];

  	this.childAction = ActionViewUtil.combineInnerView(makeProjectChildAction);

  	return this;
  }


}

// class MakeProjectAction extends CommonActionView {
//
//   constructor(parentAction) {
//     super();
//     this.parentAction = parentAction;
//   }
//
//   doAction() {
//
//   }
//
//   get parentAction() { return this._parentAction; }
//   set parentAction(parentAction){ this._parentAction = parentAction;  }
//
//
// }
