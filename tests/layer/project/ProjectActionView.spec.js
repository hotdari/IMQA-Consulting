// const ProjectActionView = require("../../../src/layer/project/ProjectActionView");
// const ActionViewContext = require("../../../src/layer/common/ActionViewContext");
// const ActionViewUtil = require("../../../src/layer/common/ActionViewUtil");

import {ProjectActionView} from "@/layer/project/ProjectActionView"
import {ActionViewContext} from "@/layer/common/ActionViewContext"
import {ActionViewUtil} from "@/layer/common/ActionViewUtil"

test('getTransactionId ', () => {
  console.log(ActionViewUtil.getTxId())
});

test('ActionViewContext setBean', () => {

  let context = ActionViewContext.getInstance();
  context.setBean(ActionViewUtil.getTxId(), ProjectActionView.newInstance().makeProject());

  console.log(ActionViewContext.getInstance())  //singleton check

});

test('ActionViewContext getBean', () => {

  let context = ActionViewContext.getInstance();
  let myTxId = ActionViewUtil.getTxId();
  context.setBean(myTxId, ProjectActionView.newInstance().makeProject());

  console.log(context);
  console.log(context.getBean(myTxId));

});


test('Project New Instance 테스트 ', () => {

  let context = ActionViewContext.getInstance();
  let myTxId = ActionViewUtil.getTxId();
  context.setBean(myTxId, ProjectActionView.newInstance().makeProject());

  ProjectActionView.newInstance().makeProject()
      .nextAction(AnaysisActionView.newInstance().projectAnaysis())
      //.nextAction(ReportActionView.newInstance().makePPT())


  context.getBean(myTxId).doAction(); //프로젝트 명 만들기
  context.getBean(myTxId).doAction("2022년 처음 앱 컨설팅");  // 서버에서 앱 리스트 받아와서 선택하게 하기
  context.getBean(myTxId).doAction("21.1.1.");

});
