import { ipcMain } from "electron";
import axios from "axios";
import axiosModel from "../AxiosModel";

export function projectList(){
	ipcMain.on("projectList", function (event, arg) {
		axiosModel
			.get("http://ote-mpm.imqa.io/api/project/list").then(res => {
				console.log(res);
				// const project_list = [];
				//
				// // 프로젝트 리스트 중복체크(각 서비스당 하나씩 불러옴 체크필요)
				// for(const project of res.data.project_list) {
				// 	if(project_list.length > 0 && project_list[project_list.length - 1].project_id === project.project_id){
				// 		project_list[project_list.length - 1].service_mpm = true;
				// 		project_list[project_list.length - 1].service_crash = true;
				// 	}else{
				// 		project_list.push(project);
				// 	}
				// }
				event.reply("projectList-reply", project_list);
			})
			.catch(err => event.reply("projectList-reply", { massage: "error", error: err }));
	});
}

