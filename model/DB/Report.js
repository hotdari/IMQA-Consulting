// 보고서 - PPT 생성을 위한 데이터 관리

const sample = require("../../db/dbReportSample.js");
import {db} from "../../db";

class Report {
  constructor(dao) {
    this.dao = dao;
  }

  createTable(){
    this.dao.run('CREATE TABLE IF NOT EXISTS report ( report_id INTEGER PRIMARY KEY AUTOINCREMENT, FOREIGN KEY(project_id) REFERENCES project(project_id), desc TEXT, content TEXT )',[], arg=>{
      console.log('create Report :: ', arg);
    });
  }
  selectReport(arg){
    return new Promise((resolve, reject) => {
      this.dao.get(`SELECT * FROM report WHERE project_id = ${arg}`, (err, rows) => {
        console.log(rows);
        if(err){return reject(err);}
        resolve(rows);
      });
    })
  }
  insertReport(arg){
    return this.dao.run('INSERT INTO report VALUES(?,?,?,?)',[arg.report_id, arg.project_id, arg.desc, JSON.stringify(arg.content)], (err,arg)=>{});
    // 샘플
    // return this.dao.run('INSERT INTO report VALUES(?,?,?,?)',[1, 1, "설명", JSON.stringify(sample)], (err,arg)=>{});
  }
}


const report = new Report(db);
export default report;
