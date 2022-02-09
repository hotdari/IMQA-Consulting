// 로그인 (실제 로그인 처리는 Live서버에서 처리하고 여기는 id(이메일)와 쿠키값 저장/관리)

import {db} from "../../db";

class Login {
  constructor(dao) {
    this.dao = dao;
  }

  createTable(){
    // this.dao.run('CREATE TABLE IF NOT EXISTS login (id TEXT PRIMARY KEY, password TEXT, token TEXT, last_login TEXT)',[], arg=>{
    this.dao.run('CREATE TABLE IF NOT EXISTS login (id TEXT PRIMARY KEY, token TEXT, last_login TEXT)',[], arg=>{
      console.log('create Login :: ', arg);
    });
  }
  selectLogin(arg){
    return new Promise((resolve, reject) => {
      this.dao.get(`SELECT * FROM login WHERE id=${arg.id}`, (err, rows) => {
        if(err){return reject(err);}
        resolve(rows.length);
      });
    })
  }
  insertLogin(arg){
    return this.dao.run('INSERT INTO login VALUES(${arg.id}, ${arg.token}, datetime(now))', (err,arg)=>{});
  }
  updateLogin(arg){
    return this.dao.run(`UPDATE login SET last_login=datetime(now) WHERE id=${arg.id}`, (err,arg)=>{});
  }
}

// Live 로그인해서 쿠키(토큰)값을 가져옴
// 쿠키가 있을 때 : selectLogin id로 조회되는 데이터가 있는지 확인
//               데이터가 있으면 updateLogin (last_login 갱신)
//               데이터가 없으면 insertLogin
// 쿠키가 없을 때 : 화면에서 로그인 재시도 메시지 안내

const login = new Login(db);
export default login;
