/**
 * BOT에서 보내는 (정해져 있는) 메시지
 */

const sample_project = require("../../db/dbMsgProjectSample.js");
const sample_analysis = require("../../db/dbMsgAnalysisSample.js");
import db from "../../db/db";

class Message {
  constructor(dao) {
    this.dao = dao;
  }

  /**
   * 테이블 생성
   * message_type : BOT 메시지 타입 ('project' : 컨설팅 대화에서 사용하는 메시지, 'analysis' : 상세 컨설팅에서 사용하는 메시지)
   * content : BOT에서 보내는 메시지 (String -> JSON Array로 변환 필요)
   */
  createTable(){
    this.dao.run('CREATE TABLE IF NOT EXISTS message ( message_type TEXT PRIMARY KEY, content TEXT )',[], arg=>{
      console.log('create BOT Message :: ', arg);
    });
  }

  /**
   * BOT에서 사용하는 메시지 저장
   * Table 생성될 때 한번만 실행
   * sample 파일에 있는 내용 insert
   */
  insertSampleMessage(){
    return new Promise((resolve, reject) => {
      this.dao.run( `INSERT INTO message(message_type, content) VALUES ("project", '${JSON.stringify(sample_project)}'), ("analysis", '${JSON.stringify(sample_analysis)}')`, function(err,res){
        resolve(this.lastID)
      });
    })
  }

  /**
   * 컨설팅 대화창에서 BOT이 사용하는 메시지 조회
   */
  selectProjectMessage(){
    return new Promise((resolve, reject) => {
      this.dao.get(`SELECT * FROM message WHERE message_type = 'project'`, (err, rows) => {
        console.log(rows);
        if(err){return reject(err);}
        resolve(rows);
      });
    })
  }

  /**
   * 상세 컨설팅 대화창에서 BOT이 사용하는 메시지 조회
   */
  selectAnalysisMessage(){
    return new Promise((resolve, reject) => {
      this.dao.get(`SELECT * FROM message WHERE message_type = 'analysis'`, (err, rows) => {
        console.log(rows);
        if(err){return reject(err);}
        resolve(rows);
      });
    })
  }
}

const message = new Message(db);
export default message;
