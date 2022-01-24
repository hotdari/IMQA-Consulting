<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <ul class="left-menus">
          <li v-for="(data, index) in this.leftMenus" v-key="index">
            <div class="dept-menu">
              <button @click="toggleOpen">
                <b-icon icon="list" aria-hidden="true"></b-icon>
              </button>
              <button class="menu" @click.self="toggleOpen">
                {{ data.name }}
              </button>
              <button class="addProject" @click="addProject(data.id)">
                <b-icon class="plus_icon" icon="plus" aria-hidden="true"></b-icon>
              </button>
            </div>
            <div class="dept-child-menu">
              <ul>
                <li v-for="(childData, childIndex) in data.menus.childMenus" v-key="'1'+childIndex">
                  <div class="dept-menu">
                    <button @click="toggleOpen">
                      <b-icon class="toggle_arrow" icon="caret-right-fill" aria-hidden="true"></b-icon>
                    </button>
                    <button class="menu" @click.self="toggleOpen">
                        {{ childData.name }}
                    </button>
                    <button class="addConsulting" @click="addConsulting(childData.id)">
                      <b-icon class="plus_icon" icon="plus" aria-hidden="true"></b-icon>
                    </button>
                  </div>
                  <div class="consulting-list">
                    <ul>
                      <li v-for="(consultingMenu, consultingIndex) in childData.consultingMenus" v-key="'2'+consultingIndex">
                        <button>{{ consultingMenu.name }}</button>
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
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import { FadeTransition } from "vue2-transitions";

export default {
	components: {
		DashboardNavbar,
		ContentFooter,
		DashboardContent,
		FadeTransition
	},
	data(){
		return {
			selectMenuId: null,
			selectChildMenuId: null,
			selectConsultingId: null,
			isActive: false,
			leftMenus: [
				{
					id: 0,
					name: "Project",
					menus: {
						id: 0,
						childMenus: [
							{
								id: 0,
								name: "하이닉스",
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
								consultingMenus: [
									{
										id: 0,
										name: "2021.01.13 11:03:02"
									}
								]
							}
						]
					}
				},
				{
					id: 1,
					name: "POC 고객",
					menus: {
						id: 0,
						childMenus: [
							{
								id: 0,
								name: "따릉이",
								consultingMenus: [
									{
										id: 0,
										name: "2021.01.13 11:03:02"
									}
								]
							},
							{
								id: 1,
								name: "KB국민은행",
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
		},
		addConsulting(id){
			console.log("컨설팅 추가", id);
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

      &:focus{
       outline: none;
      }
    }
  }
</style>
