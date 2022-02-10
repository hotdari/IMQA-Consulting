/**
 * SET UP - workspace, server_url 설정
 *
 * record 하나만 들어감
 * n회 실행 - selectConfig 데이터 가져오기 -> row 있으면 정보 가져와서 보여주기
 * 저장 - selectConfig 데이터 가져오기
 *              -> server_url 값이 일치하는 게 있는지 비교
 *              -> 1) 있음 : worksapce 값이 비교해 다르면 update
 *                 2) 없음 : insert
 */

import db from "../../db/db";

class Config {
	constructor(dao) {
		this.dao = dao;
	}

	/**
   * 테이블 생성
   * server_url : 라이브 서버 URL
   * workspace : 로컬 경로
   * service : "MPM" (default)
   */
	createTable(){
		this.dao.run("CREATE TABLE IF NOT EXISTS config (server_url TEXT PRIMARY KEY, workspace TEXT, service TEXT NOT NULL DEFAULT \"mpm\")", [], arg=>{
			console.log("create Config :: ", arg);
		});
	}

	/**
   * config 설정 가져오기
   */
	selectConfig(arg){
		return new Promise((resolve, reject) => {
			this.dao.get("SELECT * FROM config", (err, rows) => {
				if(err){return reject(err);}
				resolve(rows.length);
			});
		});
	}

	/**
   * config 설정 저장
   * @param server_url  String  라이브 서버 URL
   * @param workspace String  로컬 경로
   */
	insertConfig(arg){
    return new Promise((resolve, reject) => {
      this.dao.run("INSERT INTO config(server_url, workspace) VALUES(?,?)", [arg.server_url, arg.workspace], function(err,res){
        resolve(this.lastID)
      });
    })
	}

	/**
   * config 설정 수정(로컬 경로를 수정하기 위함)
   * @param server_url  String  라이브 서버 URL
   * @param workspace String  로컬 경로
   */
  updateConfig(arg){
    return new Promise((resolve, reject) => {
      this.dao.run(`UPDATE config SET workspace='${arg.workspace}' WHERE server_url='${arg.server_url}'`, function(err,res){
        resolve(this.changes)
      });
    })
  }
}

const config = new Config(db);
export default config;
