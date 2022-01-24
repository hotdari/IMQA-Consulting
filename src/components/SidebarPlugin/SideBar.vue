<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md pr-0 pl-0 navbar-dark" id="sidenav-main">
        <div class="container-fluid">

            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">

            </navbar-toggle-button>
            <router-link class="navbar-brand" to="/">
                <img :src="logo" class="navbar-brand-img" alt="...">
            </router-link>

            <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show pr-0 pl-0 ml-0 mr-0" id="sidenav-collapse-main">

                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <img :src="logo">
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav ml-0 mr-0">
                    <slot name="links">
                    </slot>
                </ul>
                <!--Divider-->
                <hr class="my-3">
                <!--Heading-->
                <h6 class="navbar-heading text-muted">Documentation</h6>
                <!--Navigation-->
                <ul class="navbar-nav mb-md-3  ml-0 mr-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/Setup">
                          <i class="ni ni-spaceship"></i> Setup page
                        </router-link>
                    </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/Login">
                      <i class="ni ni-key-25"></i> Login page
                    </router-link>
                  </li>
                </ul>
            </div>
            </div>
    </nav>
</template>
<script>
  import NavbarToggleButton from '@/components/NavbarToggleButton'

  export default {
    name: 'sidebar',
    components: {
      NavbarToggleButton
    },
    props: {
      logo: {
        type: String,
        default: '/imqa_logo_dark.svg',
        description: 'Sidebar app logo'
      },
      autoClose: {
        type: Boolean,
        default: true,
        description: 'Whether sidebar should autoclose on mobile when clicking an item'
      }
    },
    provide() {
      return {
        autoClose: this.autoClose
      };
    },
    methods: {
      closeSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      showSidebar() {
        this.$sidebar.displaySidebar(true)
      }
    },
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    }
  };


</script>

<style lang="scss" scoped>
#sidenav-main{
  background-color: #303e4d;
}

@media (max-width: 768px) {
  #sidenav-main{
    display: none;
  }
}
</style>
