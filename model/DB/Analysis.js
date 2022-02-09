// 상세 컨설팅 내용 (화면로딩시간, 응답시간, 메모리, CPU)

import {db} from "../../db";

class Analysis {
  constructor(dao) {
    this.dao = dao;
  }

  createTable(){
    this.dao.run('CREATE TABLE IF NOT EXISTS analysis (analysis_id INTEGER PRIMARY KEY AUTOINCREMENT, analysis_type TEXT, FOREIGN KEY(project_id) REFERENCES project(project_id), reg_date TEXT, last_update TEXT, message TEXT)',[], arg=>{
      // analysis_id : 상세 컨설팅 ID
      // analysis_type : 상세 컨설팅 타입 (rendering, response, memory, cpu)
      // project_id : 컨설팅 ID
      // reg_date : 등록 시간
      // last_update : 마지막 업데이트 시간
      // message : 대화 내용 (셀레니움에서 저장한 이미지 파일 이름 & 사용자가 입력한 컨설팅 내용)
      console.log('create Analysis :: ', arg);
    });
  }
  selectAnalysisMessage(arg){
    return new Promise((resolve, reject) => {
      this.dao.get(`SELECT message FROM analysis WHERE project_id = ${arg.project_id} AND analysis_type = ${arg.analysis_type}`, (err, rows) => {
        console.log(rows);
        if(err){return reject(err);}
        resolve(rows);
      });
    })
  }
  insertAnalysis(arg){
    return this.dao.run('INSERT INTO analysis VALUES(${arg.analysis_type}, ${arg.project_id}, datetime(now), datetime(now), ${arg.message})',[], (err,arg)=>{});
  }
  updateAnalysis(arg){
    return this.dao.run(`UPDATE analysis SET last_update=datetime(now) WHERE project_id = ${arg.project_id} AND analysis_type = ${arg.analysis_type}`, (err,arg)=>{});
  }
}

const analysis = new Analysis(db);
export default analysis;
