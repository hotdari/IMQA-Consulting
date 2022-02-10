/**
 * 보고서 - PPT 생성을 위한 데이터 관리
 * @type {{slide: [{image: string, logo: string, title: string, desc: string},{image: string, title: string, desc: string},{image: string, title: string, desc: string}]}|{slide?: [{image: string, logo: string, title: string, desc: string},{image: string, title: string, desc: string},{image: string, title: string, desc: string}]}}
 */
const sample = require("../../db/dbReportSample.js");
import db from "../../db/db";

class Report {
  constructor(dao) {
    this.dao = dao;
  }

  /**
   * 테이블 생성
   * report_id : 레포트 ID
   * project_id : 컨설팅 ID (project.project_id FK)
   * desc : 설명
   * content : 컨설팅 내용 (String -> JSON Array로 변환 필요)
   */
  createTable(){
    this.dao.run('CREATE TABLE IF NOT EXISTS report ( report_id INTEGER PRIMARY KEY AUTOINCREMENT, project_id INTEGER NOT NULL, desc TEXT, content TEXT, FOREIGN KEY(project_id) REFERENCES project(project_id) )',[], arg => {
      console.log('create Report :: ', arg);
      return arg
    });
  }

  /**
   * 컨설팅 ID로 레포트 정보 가져오기
   * @param project_id  Number 컨설팅 ID
   */
  selectReport(arg){
    return new Promise((resolve, reject) => {
      this.dao.get(`SELECT * FROM report WHERE project_id = '${arg.project_id}'`, (err, rows) => {
        console.log(rows);
        if(err){return reject(err);}
        resolve(rows);
      });
    })
  }

  /**
   * 레포트 정보 저장
   * @param report_id Number 레포트 ID
   * @param project_id  Number 컨설팅 ID
   * @param desc  String 설명
   * @param content Object 컨설팅 내용 (JSON Array)
   */
  insertReport(arg){
    return this.dao.run(`INSERT INTO report VALUES('${arg.report_id}', '${arg.project_id}', '${arg.desc}', '${JSON.stringify(arg.content)}')`,[], (err,arg)=>{});
    // 샘플
    // return this.dao.run('INSERT INTO report VALUES(?,?,?,?)',[1, 1, "설명", JSON.stringify(sample)], (err,arg)=>{});
  }
}

const report = new Report(db);
export default report;
