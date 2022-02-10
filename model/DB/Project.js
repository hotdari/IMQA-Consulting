/**
 * 프로젝트 (프로젝트 리스트&컨설팅 시작 대화창)
 */

import db from "../../db/db";

export class ProjectDao {
  constructor() {
    this.dao = db;
    this.createTable()
  }

  /**
   * 테이블 생성
   * project_id : 컨설팅 ID
   * app_id : 라이브 프로젝트의 ID (project_id)
   * project_name : 컨설팅 이름
   * reg_date : 등록 시간
   * last_update : 마지막 업데이트 시간
   * message : 대화 내용 (컨설팅을 진행하시겠습니까? ~~ 해당 날짜로 컨설팅 기간을 선택합니다.)
   */
  createTable(){
    this.dao.run('CREATE TABLE IF NOT EXISTS project (project_id INTEGER PRIMARY KEY AUTOINCREMENT, app_id INTEGER, project_name TEXT, reg_date TEXT, last_update TEXT, message TEXT)',[], arg=>{
      console.log('create Project :: ', arg);
    });
  }

  /**
   * 라이브 프로젝트의 ID로 컨설팅(프로젝트) 조회
   * @param app_id  Number  라이브 프로젝트의 ID (project_id)
   */
  selectProjectByApp(arg){
    return new Promise((resolve, reject) => {
      this.dao.get(`SELECT * FROM project WHERE app_id = '${arg.app_id}' ORDER BY reg_date`, (err, rows) => {
        console.log(rows);
        if(err){return reject(err);}
        resolve(rows);
      });
    })
  }

  // /**
  //  * 컨설팅 ID로 대화내용(message) 조회
  //  * @param project_id  Number  컨설팅 ID
  //  */
  // selectProjectMessage(arg){
  //   return new Promise((resolve, reject) => {
  //     this.dao.get(`SELECT message FROM project WHERE project_id = '${arg.project_id}'`, (err, rows) => {
  //       console.log(rows);
  //       if(err){return reject(err);}
  //       resolve(rows);
  //     });
  //   })
  // }

  /**
   * 라이브 프로젝트의 ID로 컨설팅(프로젝트) 조회
   * @param app_id Number 라이브 프로젝트의 ID (project_id)
   * @param project_name Number 컨설팅 이름
   * @param message String  대화 내용
   */
  insertProject(arg){
    return new Promise((resolve, reject) => {
      this.dao.run(`INSERT INTO project(app_id, project_name, reg_date, last_update, message) VALUES('${arg.app_id}', '${arg.project_name}', datetime('now'), datetime('now'), '${arg.message}')`, function(err,res){
        resolve(this.lastID)
      });
    })
  }

  /**
   * 컨설팅에 바뀐 내용이 있을 때 업데이트 (사용 여부 모르겠음)
   * @param project_id  Number  컨설팅 ID
   * @param project_name Number 컨설팅 이름 -> 있을 수도 없을수도..
   * @param message String  대화 내용 -> 있을 수도 없을수도..
   */
  updateProject(arg){
    return this.dao.run(`UPDATE project SET last_update=datetime('now') WHERE project_id='${arg.project_id}'`, (err,arg)=>{});
  }
}


// const project = new Project(db);
// export default project;
