import { CommonActionView } from "../common/CommonActionView";
import { ActionViewUtil } from "../common/ActionViewUtil";
import selenium from "../../../model/Selenium";
import { ReportDao } from "../../../model/DB/Report";

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

  nextAction(context, txId){
  	context.setBean(txId, this.nextActionObj);
  	this.nextActionObj.doAction(context, txId);
  }

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
  		this.actionView.innerAction(function (context, txId) {
  			console.log("preview", context, txId);

  			context.getVue().$emit("message",
  				{
  					user: "Bot",
  					time: "오후 1:12",
  					body: "<p>2021프로젝트는 IOS이며 하이브리드로 구성되어 있습니다</p>"
  				});


  			// 셀레니움 프리셋 스크린샷
  			selenium.connect("http://ote-mpm.imqa.io/mpm/32/management/reference").createScreenshot({
  				wait_target: ".setting-body",
  				screenshot_target: ".setting-body",
  				screenshot_image_name: "preset_img"
  			}, 5000);

  			return this.nextActionObj.doAction(context, txId);
  		}),

  		this.actionView.innerAction(function (context, txId) {
  			console.log("프리셋", context, txId);
  			context.getVue().$emit("message",
  				{
  					user: "Bot",
  					time: "오후 1:12",
  					body: "<p>프리셋은 다음과 같이 구성되어 있습니다</p>" +
              "<br/><img src='file:/Users/namsang-u/Desktop/workspace/IMQA-Consulting/preset_img.png'>"
  				});


  			// 셀레니움 레포트 스크린샷
  			selenium.connect("http://ote-mpm.imqa.io/mpm/32/report").createClickScreenshot(".version-apply-btn", {
  				wait_target: "#page1",
  				screenshot_target: "#page1",
  				screenshot_image_name: "report_img"
  			}, 5000);

  			return this.nextActionObj.doAction(context, txId);
  		}),

  		this.actionView.innerAction(function (context, txId) {
  			console.log("레포트", context, txId);
  			context.getVue().$emit("message",
  				{
  					user: "Bot",
  					time: "오후 1:13",
  					body: "<p>레포트 요약은 다음과 같습니다.</p>" +
              "<br/><img src='file:/Users/namsang-u/Desktop/workspace/IMQA-Consulting/report_img.png'>"
  				});

  			new ReportDao().insertReport({
  				project_id: 32,
  				title: "아리따움 1.0v",
  				desc: "설명문",
  				content: {
  					slide: [
  						{
  							title: "<p>아리따움 성능 리포트</p>",
  							desc: "어니컴 성능솔루션 사업부",
  							logo: "onycom.png",
  							image: "main.png"
  						},
  						{
  							title: "이슈 요약",
  							desc: "<p>이슈 요약이 없습니다.</p>",
  							image: ""
  						},
  						{
  							title: "3.3.0",
  							desc: "<p>화면 로딩시간 :</p><p><br/></p><p>웹뷰 화면 로딩시간:</p><p>화면에 로딩 지연 시간이 많이 발생함.</p><p>주로 결재나 카트 부분이 느림</p><p>상세한 부분은 뒤에서 언급함.</p><p></p><p>응답시간 : </p><p>대체로 양호한 상황</p><p><br/></p><p>CPU 사용량:</p><p>대부분은 50% 이하로 양호하나 4% 정도는</p><p>CPU 과다 사용구간이 존재함.</p><p><br/></p><p>메모리 사용량:</p><p>100MB 이상 사용하는 구간이 약 4% 존재함.</p>",
  							image: "report_img.png"
  						}
  					] }
  			});

  			return this.nextActionObj.doAction(context, txId);
  		}),

  		this.actionView.innerAction(function (context, txId) {
  			console.log("데이터 분석 기준", context, txId);
  			context.getVue().$emit("message",
  				{
  					user: "Bot",
  					time: "오후 1:13",
  					body: "<p>데이터 분석을 진행하겠습니다.</p>" +
              "<p>데이터 그룹핑 기준은 하루 단위로 데이터 분석을 진행하겠습니다. 데이터 그룹 기준을 바꾸시겠습니까?</p>",
  					action: "<div class='mt-1'><button data-event='selectDataDay' data-txId='" + txId + "' class='btn btn-primary btn-sm'>하루를 기준으로 해주세요.</button></div>"
  				});

  			return this.nextActionObj;
  		}),

  		this.actionView.innerAction(function (context, txId) {
  			console.log("[사용자]데이터 분석 기준 응답", context, txId);
  			context.getVue().$emit("message",
  				{
  					user: "사용자",
  					time: "오후 1:14",
  					body: "<p>하루를 기준으로 해주세요.</p>"
  				});

  			return this.nextActionObj.doAction(context, txId);
  		}),

  		this.actionView.innerAction(function (context, txId) {
  			console.log("데이터 분석", context, txId);

  			context.getVue().$emit("message",
  				{
  					user: "bot",
  					time: "오후 1:14",
  					body: "<p>하루를 기준으로 진행합니다.</p>" +
              "<p>2022-02-11 ~ 2022-02-12 까지의 데이터 그룹핑 결과가 나옵니다.</p>"
  				});

  			return this.nextActionObj.doAction(context, txId);
  		}),

  		this.actionView.innerAction(function (context, txId) {
  			console.log("데이터 분석", context, txId);

  			context.getVue().$emit("message",
  				{
  					user: "bot",
  					time: "오후 1:14",
  					body: "<p>하루를 기준으로 진행합니다.</p>" +
              "<p>2022-02-11 ~ 2022-02-12 까지의 데이터 그룹핑 결과가 나옵니다.</p>"
  				});

  			return this.nextActionObj.doAction(context, txId);
  		}),

  		this.actionView.innerAction(function (context, txId) {
  			console.log("네이티브 화면 로딩 시간 분석", context, txId);

  			context.getVue().$emit("message",
  				{
  					user: "bot",
  					time: "오후 1:15",
  					body: "<p>네이티브 화면로딩시간 데이터 분석을 시작합니다.</p>"
  				});

  			return this.nextActionObj.doAction(context, txId);
  		}),

  		this.actionView.innerAction(function (context, txId) {
  			console.log("네이티브 화면 로딩 시간 분석", context, txId);

  			context.getVue().$emit("message",
  				{
  					user: "bot",
  					time: "오후 1:15",
  					body: "<p>네이티브 화면로딩시간 데이터 분석이 완료되었습니다.</p>",
  					action: "<div class='mt-1'><button data-event='nativeLoading1' data-txId='" + txId + "' class='btn btn-primary btn-sm'>[네이티브 화면로딩 시간] 2022-01-11 00:00 ~ 2022-01-11 23:59</button></div>" +
            "<div class='mt-1'><button data-event='nativeLoading2' data-txId='" + txId + "' class='btn btn-primary btn-sm'>[네이티브 화면로딩 시간] 2022-01-12 00:00 ~ 2022-01-12 23:59</button></div>"
  				});

  			context.getBean(txId).nextAction(context, txId);
  		})

  	];
  	this.childAction = ActionViewUtil.combineInnerView(makeProjectChildAction);

  	return this;
  }


}
