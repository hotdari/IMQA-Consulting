<template>
  <div class="main-content bg-white">
    <div class="main-content">
      <zoom-center-transition
        :duration="pageTransitionDuration"
        mode="out-in"
      >
        <router-view></router-view>
      </zoom-center-transition>
    </div>
  </div>
</template>
<script>
import { BaseNav } from "@/components";
import { ZoomCenterTransition } from "vue2-transitions";

export default {
	components: {
		BaseNav,
		ZoomCenterTransition
	},
	props: {
		backgroundColor: {
			type: String,
			default: "black"
		}
	},
	data() {
		return {
			showMenu: false,
			menuTransitionDuration: 250,
			pageTransitionDuration: 200,
			year: new Date().getFullYear(),
			pageClass: "login-page"
		};
	},
	computed: {
		title() {
			return `${this.$route.name} Page`;
		}
	},
	watch: {
		$route: {
			immediate: true,
			handler: function () {
			}
		}
	},
	methods: {
		toggleNavbar() {
			document.body.classList.toggle("nav-open");
			this.showMenu = !this.showMenu;
		},
		closeMenu() {
			document.body.classList.remove("nav-open");
			this.showMenu = false;
		}
	},
	beforeRouteUpdate(to, from, next) {
		// Close the mobile menu first then transition to next page
		if (this.showMenu) {
			this.closeMenu();
			setTimeout(() => {
				next();
			}, this.menuTransitionDuration);
		} else {
			next();
		}
	}
};
</script>
<style lang="scss">
  $scaleSize: 0.8;
  @keyframes zoomIn8 {
    from {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
    100% {
      opacity: 1;
    }
  }

  .main-content .zoomIn {
    animation-name: zoomIn8;
  }

  @keyframes zoomOut8 {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
  }

  .main-content .zoomOut {
    animation-name: zoomOut8;
  }
</style>
