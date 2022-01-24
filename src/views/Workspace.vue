<template>
  <div>
    <div class="workspace">
      <div class="workspace_body" ref="chat">
        <div class='chat_messages'>
          <div v-for='message in messages' :key='message.id'>
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

export default {
	name: "Workspace",
	components: {
		ChatEditor,
		ChatMessage
	},
	data() {
	  return{
			messages: [
				{
					id: 0,
					user: "IMQA Bot",
					time: "오후 1:11",
					body: "<p>컨설팅 진행을 도와드리겠습니다</p><p>아리따움 프로젝트의 컨설팅을 시작하시겠습니까?</p>",
					action: "<button data-event='startConsulting' class='btn btn-primary btn-sm'>네. 시작할게요</button><button data-event='cancelConsulting' class='btn btn-secondary btn-sm'>취소합니다</button>"
				},
				{
					id: 1,
					user: "사용자",
					time: "오후 1:12",
					body: "<p>네. 시작할게요</p>",
					action: ""
				},
				{
					id: 2,
					user: "IMQA Bot",
					time: "오후 1:11",
					body: "<p>앱버전을 선택해주세요.</p>",
					action: "<select data-event='selectVersion'><option value='1.0'>1.0</option><option value='2.0'>2.0</option></select><div class='mt-1'><button data-event='startVersion' class='btn btn-primary btn-sm'>선택된 버전으로 시작합니다.</button><button data-event='cancelVersion' class='btn btn-secondary btn-sm'>취소합니다</button></div>"
				},
				{
					id: 3,
					user: "사용자",
					time: "오후 1:12",
					body: "<p>1.0 버전으로 시작합니다.</p>",
					action: ""
				}
				// {
				// 	id: 4,
				// 	user: "IMQA Bot",
				// 	time: "오후 1:11",
				// 	body: "<p>달력을 눌러 컨설팅 기간을 선택해주세요.</p>",
				// 	action: "<input type='date'></input><div class='mt-1'><button data-event='startDate' class='btn btn-primary btn-sm'>선택된 기간으로 시작합니다.</button><button data-event='cancelDate' class='btn btn-secondary btn-sm'>취소합니다</button></div>"
				// },
				// {
				// 	id: 5,
				// 	user: "사용자",
				// 	time: "오후 1:12",
				// 	body: "<p>해당 날짜로 컨설팅 기간을 선택합니다.</p>",
				// 	action: ""
				// }
			]
		};
	},
	mounted() {
		this.scrollToElement();
	},
	updated() {
		this.scrollToElement();
	},
	methods: {
		scrollToElement() {
			const el = this.$refs.chat;

			if (el) {
				// Use el.scrollIntoView() to instantly scroll to the element
				el.scrollTop = el.scrollHeight;
			}
			console.log(el.scrollTop);
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
