<template>
  <div class="content">
      <!-- your content here -->
      <router-view></router-view>
  </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
export default {
	components: {
		FadeTransition
	}
};
</script>
<style></style>
