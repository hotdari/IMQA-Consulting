// SET UP - workspace, server_url 설정

import {db} from "../../db";

class Config {
  constructor(dao) {
    this.dao = dao;
  }

  createTable(){
    this.dao.run('CREATE TABLE IF NOT EXISTS config (server_url TEXT PRIMARY KEY, workspace TEXT, service TEXT NOT NULL DEFAULT "mpm")',[], arg=>{
      console.log('create', arg);
    });
  }
  selectConfig(arg){
    return new Promise((resolve, reject) => {
      this.dao.get(`SELECT * FROM config`, (err, rows) => {
        if(err){return reject(err);}
        resolve(rows.length);
      });
    })
  }
  insertConfig(arg){
    return this.dao.run('INSERT INTO config VALUES(?,?)',[arg.server_url, arg.workspace], (err,arg)=>{});
  }
  updateConfig(arg){
    return this.dao.run(`UPDATE config SET workspace=${arg.workspace} WHERE server_url=${arg.server_url}`, (err,arg)=>{});
  }
}

// record 하나만 들어감
// n회 실행 - selectConfig 데이터 가져오기 -> row 있으면 정보 가져와서 보여주기
// 저장 - selectConfig 데이터 가져오기
//              -> server_url 값이 일치하는 게 있는지 비교
//              -> 1) 있음 : worksapce 값이 비교해 다르면 update
//                 2) 없음 : insert

const config = new Config(db);
export default config;
