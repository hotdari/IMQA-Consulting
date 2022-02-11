import { ipcMain } from "electron";
import axios from "axios";
import axiosModel from "../AxiosModel";

export function projectList(){
  ipcMain.on("projectList", function (event, arg) {

    var config = {
      method: 'get',
      url: 'http://ote-mpm.imqa.io/api/project/list',
      headers: {
        'Cookie': 'IMQA_OTE_SESSION=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDUxMzA4NzksInVzZXJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW5AaW1xYS5pbyIsImVtYWlsIjoiYWRtaW5AaW1xYS5pbyIsIm5pY2tuYW1lIjoi6rSA66as7J6QIiwiaXNfc3VwZXJ1c2VyIjoxLCJ1c2VyX3R6Ijo5LCJpYXQiOjE2NDQ1MjYwNzksImlzcyI6Im1wbS5pbXFhLmlvIiwic3ViIjoibXBtIn0.-Awt3cCqlO4sTp6-bLB2dgNdh5-Mqa9KB_cMQWLGZvw'
      },
    };



    axios(config)
      .then(function (res) {

        const project_list = [];

        // 프로젝트 리스트 중복체크(각 서비스당 하나씩 불러옴 체크필요)
        for(const project of res.data.project_list) {
          if(project_list.length > 0 && project_list[project_list.length - 1].project_id === project.project_id){
            project_list[project_list.length - 1].service_mpm = true;
            project_list[project_list.length - 1].service_crash = true;
          }else{
            project_list.push(project);
          }
        }
        event.reply("projectList-reply", project_list);

      })
      .catch(function (error) {
        console.log(error);
      });


  });
}

