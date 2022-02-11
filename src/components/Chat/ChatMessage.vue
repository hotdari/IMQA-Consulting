<template>
  <div class="message chat_message_area">
    <div class="message_avatar">
      <img v-if="user === 'IMQA Bot'" src="/img/chat/bot.png" alt="">
      <img v-else src="/img/chat/user.png" alt="">
    </div>
    <div class="message_info">
      <div class="message_name">
        {{ user }} <span class="message_timestamp">{{ time }}</span>
      </div>
      <div v-html="body" class="message_txt">
      </div>
      <div v-html="action" class="action_info" ref="action">
      </div>
    </div>
  </div>
</template>

<script>
import selenium from "../../../model/Selenium";
import { ActionViewContext } from "@/layer/common/ActionViewContext";


export default {
	props: {
		user: String,
		time: String,
		body: String,
		action: String
	},
	mounted() {
		this.$refs.action.addEventListener("click", function (event) {
			if(event.target.dataset.event === "downloadReport") {
				//powerpoint download
				const context = ActionViewContext.getInstance();
				context.getBean(event.target.dataset.txid)._myActionView.savePpt();
			} else {
				console.log("clicked: ", event.target.dataset);
				const context = ActionViewContext.getInstance();
				context.getBean(event.target.dataset.txid).doAction(context, event.target.dataset.txid);
			}
		});
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  align-items: self-start;
  padding: 20px;

  .message_avatar img{
    height: 50px;
    width: 50px;
    object-fit: contain;
    border-radius: 15px;
    overflow: hidden;
  }

  .message_info {
    padding-left: 10px;

    .message_timestamp {
      color: grey;
      font-weight: 300;
      font-size: 13px;
    }

    .message_txt {
      p{
        margin: 0 !important;
      }
    }
  }
}
</style>
<style lang="scss">
 /* v-html 제어 스타일 */
 .message{
   .message_txt {
     p{
       margin: 0 !important;
     }
   }
 }
</style>
