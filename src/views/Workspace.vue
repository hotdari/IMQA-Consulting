<template>
  <div>
    <div class="workspace">
      <div class="workspace_body" ref="chat">
        <div class='chat_messages'>
          <div v-for='message in getMessages' :key='message.id'>
            <chat-message :user='message.user' :time='message.time'
                         :body='message.body' :action='message.action'></chat-message>
          </div>
        </div>
      </div>
      <div class="workspace_footer">
        <chat-editor @send="sendMessage"></chat-editor>
      </div>
    </div>
  </div>
</template>

<script>
import ChatMessage from "@/components/Chat/ChatMessage";
import ChatEditor from "@/components/Chat/ChatEditor";
import chatJson from "@/chat.json";

export default {
	name: "Workspace",
	components: {
		ChatEditor,
		ChatMessage
	},
	data() {
	  return{

		};
	},
	computed: {
		// 현재 챗팅 메세지 가져오기
		getMessages() {
			return this.$store.state.chat.messages;
		}
	},
	created() {
		this.getChatMessages();
	},
	mounted() {
		this.scrollToElement();
	},
	updated() {
		this.scrollToElement();
	},
	methods: {
		getChatMessages(){
			this.$store.dispatch("chat/setMessages", chatJson);
		},
		scrollToElement() {
			const el = this.$refs.chat;

			if (el) {
				// Use el.scrollIntoView() to instantly scroll to the element
				el.scrollTop = el.scrollHeight;
			} else {
				return;
			}
		},
		sendMessage(){
		  this.scrollToElement();
		}
	}
};
</script>
<style lang="scss" scoped>
.workspace{
  display: flex;
  height: 100vh;
  flex-direction: column;

  .workspace_body{
    display: flex;
    position: relative;
    flex-direction: column;
    height:100%;
    overflow-y: auto;
    min-height: 0;
    flex: 1;
    overflow: auto;

    .chat_messages{
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      flex-shrink: 0;
      flex-grow: 1;
    }
  }

  .workspace_footer{
    padding:20px;
  }
}

</style>
