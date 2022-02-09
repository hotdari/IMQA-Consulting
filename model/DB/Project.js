// 프로젝트 (프로젝트 리스트&컨설팅 시작 대화창)

import {db} from "../../db";

class Project {
  constructor(dao) {
    this.dao = dao;
  }

  createTable(){
    this.dao.run('CREATE TABLE IF NOT EXISTS project (project_id INTEGER PRIMARY KEY AUTOINCREMENT, app_id INTEGER, project_name TEXT, reg_date TEXT, last_update TEXT, message TEXT)',[], arg=>{
      // project_id : 컨설팅 ID
      // app_id : 라이브 프로젝트의 ID (project_id)
      // reg_date : 등록 시간
      // last_update : 마지막 업데이트 시간
      // message : 대화 내용 (컨설팅을 진행하시겠습니까? ~~ 해당 날짜로 컨설팅 기간을 선택합니다.)
      console.log('create Project :: ', arg);
    });
  }
  selectProjectByApp(arg){
    return new Promise((resolve, reject) => {
      this.dao.get(`SELECT * FROM project WHERE app_id = ${arg} ORDER BY reg_date`, (err, rows) => {
        console.log(rows);
        if(err){return reject(err);}
        resolve(rows);
      });
    })
  }
  // selectProjectMessage(arg){
  //   return new Promise((resolve, reject) => {
  //     this.dao.get(`SELECT message FROM project WHERE project_id = ${arg}`, (err, rows) => {
  //       console.log(rows);
  //       if(err){return reject(err);}
  //       resolve(rows);
  //     });
  //   })
  // }
  insertProject(arg){
    return this.dao.run('INSERT INTO project VALUES(${arg.app_id}, ${arg.project_name}, datetime(now), datetime(now), ${arg.message})',[], (err,arg)=>{});
  }
  updateProject(arg){
    //쓰려나..?
    return this.dao.run(`UPDATE project SET last_update=datetime(now) WHERE project_id=${arg.project_id}`, (err,arg)=>{});
  }
}


const project = new Project(db);
export default project;
