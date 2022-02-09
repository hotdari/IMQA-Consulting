const sample = require("../../db/dbSample.js");
import {db} from "../../db";

class Report {
  constructor(dao) {
    console.log("dao ::: ", dao)
    this.dao = dao;
  }

  createTable(){
    this.dao.run('CREATE TABLE IF NOT EXISTS report ( report_id INTEGER PRIMARY KEY, project_id INTEGER, desc TEXT, content TEXT )',[], arg=>{
      console.log('create', arg);
    });
  }
  selectReport(arg){
    return new Promise((resolve, reject) => {
      this.dao.get(`SELECT * FROM report WHERE report_id = ${arg}`, (err, rows) => {
        console.log(rows);
        if(err){return reject(err);}
        resolve(rows);
      });
    })

  }
  insertReport(){
    return this.dao.run('INSERT INTO report VALUES(?,?,?,?)',[1, 1, "설명", JSON.stringify(sample)], (err,arg)=>{});
  }
}


const report = new Report(db);
export default report;
