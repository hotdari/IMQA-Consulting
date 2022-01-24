<template>
  <div>
    <div class="workspace">
      <div class="workspace_body"></div>
      <div class="workspace_footer">
        <chat-editor></chat-editor>
      </div>
    </div>
  </div>
</template>

<script>
import ChatEditor from "@/components/Chat/ChatEditor";
export default {
	name: "Workspace",
	components: {
		ChatEditor
	}
};
</script>
<style lang="scss" scoped>
.workspace{
  display: flex;
  height: 100vh;
  overflow-y: auto;
  flex-direction: column;

  .workspace_body{
    height:100%;
    flex: 1;
  }

  .workspace_footer{
    padding:20px;
  }
}

</style>
