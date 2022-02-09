<template>
  <div class="setup-page">
    <!-- Page content -->
    <b-container>
      <!-- Table -->
      <b-row class="justify-content-center align-content-center vh-100">
        <b-col lg="6" md="8">
          <b-card no-body class="bg-secondary border-1 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>컨설팅에 사용할 세팅값을 설정해주세요.</small>
              </div>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">

                  <div class="input-group input-group-alternative mb-3 workspace_input" :class="{ focused: active }">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="ni ni-archive-2"></i>
                      </span>
                    </div>
                    <input type="file" id="workspace" @click.prevent="getfolder">
                    <label for="workspace" ref="workspace_label">{{ changeDirectoryData }}</label>
                  </div>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-world-2"
                              placeholder="Server URL"
                              name="text"
                              v-model="model.server_url">
                  </base-input>
                  <div class="text-center">
                    <b-button type="submit" variant="primary" class="mt-4">Save</b-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { ipcRenderer } from "electron";
// import ppt from "../../../model/Ppt";

export default {
	name: "setup",
	data() {
		return {
			model: {
				directory: "",
				server_url: ""
			},
			color: "",
			active: false
		};
	},
	computed: {
		changeDirectoryData(){
			return !this.model.directory ? "Workspace URL" : this.model.directory;
		}
	},
	methods: {
		onSubmit() {
      // ppt.createPptx(1)
			this.$router.push({ path: "/login" });
		},
		getfolder() {
			//파일디렉토리 dialog 요청
			this.active = true;
			ipcRenderer.send("open-directory-dialog");

			//파일디렉토리 dialog 응답
			ipcRenderer.on("open-directory-dialog-reply", (event, arg) => {
				this.model.directory = arg.filePaths[0];
				this.$refs.workspace_label.style.color = "#8898aa";
				this.active = false;
			});
		}
	}

};
</script>
<style lang="scss" scoped>
  .setup-page {
    .workspace_input{
      #workspace {
        display: none;
      }

      label{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        overflow-x: auto;
        display: block;
        flex: 1 1 auto;
        margin: 0;
        width: 1%;
        height: calc(1.5em + 1.25rem + 2px);
        padding: 0.625rem 0.625rem 0.75rem 0;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        color: #adb5bd;
        background-color: #fff;
        background-clip: padding-box;
        -webkit-box-shadow: none;
        box-shadow: none;
        -webkit-transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
    }
  }
</style>
