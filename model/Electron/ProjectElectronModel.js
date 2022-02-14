import {ipcMain, ipcRenderer} from "electron";
import axios from "axios";
import selenium from "../Selenium";

export class ProjectElectronModel {

  static newInstance() {
    return new ProjectElectronModel();
  }

  async getAppVersion() {
    return new Promise(function(resolve, reject){

      ipcRenderer.on("appversionLoad-reply", (event, arg) => {
        debugger
        resolve(arg);
      });
      ipcRenderer.send("appversionLoad", {  });
    })
  }
}
