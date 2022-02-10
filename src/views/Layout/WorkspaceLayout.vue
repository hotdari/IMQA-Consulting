<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <ul class="left-menus">
          <li :class="{active: isMenuActive(menu.id)}" v-for="(menu, menuIndex) in this.leftMenus" :key="menu.id">
            <div class="dept-menu">
              <button @click="toggleOpen">
                <b-icon icon="list" aria-hidden="true"></b-icon>
              </button>
              <button class="menu" @click.self="toggleOpen">
                {{ menu.name }}
              </button>
              <button class="addProject" @click="addProject(menu.id)">
                <b-icon class="plus_icon" icon="plus" aria-hidden="true"></b-icon>
              </button>
            </div>
            <div class="dept-child-menu">
              <ul>
                <li :class="{active: isGroupActive(menu.id, group.id)}" v-for="(group, groupIndex) in menu.groups.childMenus" :key="group.id">
                  <div class="dept-menu">
                    <button @click="toggleOpen">
                      <b-icon class="toggle_arrow" icon="caret-right-fill" aria-hidden="true"></b-icon>
                    </button>
                    <button class="menu" :class="group.platform" @click.self="toggleOpen">
                        {{ group.name }}
                    </button>
                    <button class="addConsulting" @click="addConsulting(group.id)">
                      <b-icon class="plus_icon" icon="plus" aria-hidden="true"></b-icon>
                    </button>
                  </div>
                  <div class="consulting-list">
                    <ul>
                      <li :class="{active: isConsultingActive(menu.id, group.id, consultingMenu.id)}" v-for="(consultingMenu, consultingIndex) in group.consultingMenus" :key="consultingMenu.id">
                        <button @click="getConsulting(menu.id, group.id, consultingMenu.id)">{{ consultingMenu.name }}</button>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </template>

      <template slot="links-after">
        <hr class="my-3">
        <h6 class="navbar-heading p-0 text-muted">Documentation</h6>

        <b-nav class="navbar-nav mb-md-3">
          <b-nav-item
               href="https://www.creative-tim.com/learning-lab/bootstrap-vue/quick-start/argon-dashboard"
               >
              <i class="ni ni-spaceship"></i>
              <b-nav-text class="p-0">Getting started</b-nav-text>
          </b-nav-item>
          <b-nav-item href="https://www.creative-tim.com/learning-lab/bootstrap-vue/colors/argon-dashboard">
              <i class="ni ni-palette"></i>
              <b-nav-text class="p-0">Foundation</b-nav-text>
          </b-nav-item>
          <b-nav-item href="https://www.creative-tim.com/learning-lab/bootstrap-vue/avatar/argon-dashboard">
              <i class="ni ni-ui-04"></i>
              <b-nav-text class="p-0">Components</b-nav-text>
          </b-nav-item>
        </b-nav>
      </template>
    </side-bar>
    <div class="main-content">
      <div>
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
function hasElement(className) {
	return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
	if (hasElement(className)) {
		new PerfectScrollbar(`.${className}`);
	} else {
		// try to init it later in case this component is loaded async
		setTimeout(() => {
			initScrollbar(className);
		}, 100);
	}
}

import DashboardNavbar from "./DashboardNavbar.vue";
import DashboardContent from "./Content.vue";
import {ProjectActionView} from "../../layer/project/ProjectActionView";
import {ActionViewContext} from "@/layer/common/ActionViewContext";
import {ActionViewUtil} from "@/layer/common/ActionViewUtil";
import {AnalysisActionView} from "@/layer/project/AnaysisActionView";

export default {
	components: {
		DashboardNavbar,
		DashboardContent
	},
	data(){
		return {
		  selectMenuId: 0,
			selectGroupId: 0,
			selectConsultingId: 0,
			selectConsulting: {
				selectConsoletingMenuId: 0,
				selectConsoletingGroupId: 0,
				selectConsultingId: 0
			},
			leftMenus: [
				{
					id: 0,
					name: "Project",
					groups: {
						id: 0,
						childMenus: [
							{
								id: 0,
								name: "하이닉스",
								platform: "android",
								consultingMenus: [
									{
										id: 0,
										name: "2021.01.13 11:03:02"
									},
									{
										id: 1,
										name: "2021.01.14 12:00:12"
									}
								]
							},
							{
								id: 1,
								name: "아모레",
								platform: "ios",
								consultingMenus: [
									{
										id: 0,
										name: "2021.01.13 11:03:02"
									}
								]
							}
						]
					}
				}
			]
		};
	},
	computed: {
		isMenuActive(){
			return menu_id => {
				return this.selectMenuId === menu_id;
			};
		},
		isGroupActive(){
			return (menu_id, group_id) => {
				return (this.selectMenuId === menu_id && this.selectGroupId === group_id);
			};
		},
		isConsultingActive(){
			return (menu_id, group_id, consulting_id) => {
				return (
				  this.selectConsulting.selectConsoletingMenuId === menu_id &&
          this.selectConsulting.selectConsoletingGroupId === group_id &&
          this.selectConsulting.selectConsultingId === consulting_id
				);
			};
		}
	},
	mounted() {
		this.initScrollbar();
	},
	methods: {
		initScrollbar() {
			const isWindows = navigator.platform.startsWith("Win");
			if (isWindows) {
				initScrollbar("sidenav");
			}
		},
		toggleOpen(e){
			const target = e.currentTarget.parentNode.parentNode;
			target.classList.toggle("active");
		},
		addProject(id) {
			console.log("프로젝트 추가", id);

      let context = ActionViewContext.getInstance();
      let myTxId = ActionViewUtil.getTxId();

      // context.setVue(new Vue())
      let projectActionView = ProjectActionView.newInstance().makeProject();
      context.setBean(myTxId, projectActionView);
      let analysisActionView = AnalysisActionView.newInstance().analysisPreview();
      projectActionView.setNextAction(analysisActionView);


      projectActionView.doAction(context, myTxId);


		},
		addConsulting(id){
			console.log("컨설팅 추가", id);
		},
		getConsulting(group_id, parent_id, id){
		  this.selectConsulting.selectConsoletingMenuId = group_id;
			this.selectConsulting.selectConsoletingGroupId = parent_id;
			this.selectConsulting.selectConsultingId = id;
			console.log("컨설팅 불러오기", id);
		}
	}
};
</script>
<style lang="scss" scoped>
  .left-menus{
    padding: 0;
    display: flex;
    flex-direction: column;

    li, ul{
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .addConsulting svg, .addProject svg{
      display: none;
    }

    >li {
      padding: 5px 0px;

      .dept-child-menu{
        display: none;

        > ul {
          > li {
            padding: 4px 0;

            > .dept-menu {
              .menu {
                box-sizing: border-box;
                padding-left: 20px;
              }

              .menu.android {
                background: url("/img/icons/common/white_aos_icon.svg") no-repeat left 5px;
              }

              .menu.ios {
                background: url("/img/icons/common/white_ios_icon.svg") no-repeat left 5px;
              }
            }

            &:hover,&:focus{
              .addConsulting svg{
                display: block;
                width:20px;
                height:20px;
              }
            }

            .consulting-list {
              display: none;

              li{
                padding: 2px 0;
              }
            }

            .toggle_arrow{
              width:10px;
              hieght:10px;
              transition: all .2s;
            }

            &.active {
              .toggle_arrow{
                transform: rotate( 90deg );
              }
              .consulting-list {
                display: block;
              }
            }
          }
        }
      }

      &.active {
        .dept-child-menu{
          display: block;
        }
      }


    }

    li {
      display: flex;
      flex-direction: column;
      .dept-menu{
        display: flex;
        flex-direction: row;
        width:100%;
        &:hover,&:focus{
          .addProject svg{
            display: block;
            width:20px;
            height:20px;
          }
        }
      }

      .dept-child-menu{
        > ul {
          li {
            .dept-menu{
              padding-left: 10px;
            }

          }
        }
      }

      .consulting-list{
        li:hover {
          background-color: #4A5664;
        }
        li.active {
          background-color: #6698c8;
        }
        button {
          padding-left: 40px;
          font-size:14px;
        }
      }

      .menu {
        width: 100%;
        flex: 1;
      }
    }

    button{
      border: 0;
      background-color: transparent;
      text-align: left;
      color: #ffffff;

      &:focus{
       outline: none;
      }
    }
  }
</style>
