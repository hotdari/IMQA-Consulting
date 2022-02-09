// BOT에서 보내는 (정해져 있는) 메시지

const sample_project = require("../../db/dbMsgProjectSample.js");
const sample_analysis = require("../../db/dbMsgAnalysisSample.js");
import {db} from "../../db";

class Message {
  constructor(dao) {
    this.dao = dao;
  }

  createTable(){
    this.dao.run('CREATE TABLE IF NOT EXISTS message ( message_type TEXT PRIMARY KEY, content TEXT )',[], arg=>{
      console.log('create BOT Message :: ', arg);
    });
  }
  insertSampleMessage(arg){
    return this.dao.run( `INSERT INTO message VALUES ("project", ${JSON.stringify(sample_project)}), ("analysis", ${JSON.stringify(sample_analysis)} )`, (err,arg)=>{});
  }
  selectProjectMessage(arg){
    return new Promise((resolve, reject) => {
      this.dao.get(`SELECT * FROM message WHERE message_type = 'project'`, (err, rows) => {
        console.log(rows);
        if(err){return reject(err);}
        resolve(rows);
      });
    })
  }
  selectAnalysisMessage(arg){
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
