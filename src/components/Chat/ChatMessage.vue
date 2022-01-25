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
      <div v-html="action" class="action_info" ref="action" @click="test()">
      </div>
    </div>
  </div>
</template>

<script>
import {driver} from "../../../driver";
import webdriver from "selenium-webdriver";


export default {
  props: {
    user: String,
    time: String,
    body: String,
    action: String,
  },
  mounted() {
    this.$refs['action'].addEventListener('click', async function(event) {console.log('clicked: ', event.target.dataset); })
  },
  methods: {
    test : async function () {
      driver.then(resolve => resolve.build())
            .then(resolve => {
              resolve.get("http://www.google.com")
              return resolve;
            })
            .then(resolve => {
              resolve.findElement(webdriver.By.name("q")).sendKeys('webdriver')
              return resolve;
            })
            .then(resolve => {
              resolve.findElement(webdriver.By.name("btnK")).click();
              return resolve;
            })
            .then(async resolve => {
              await resolve.wait(webdriver.until.elementLocated(webdriver.By.id("rso")), 5000);
              await resolve.findElement(webdriver.By.id("rso")).takeScreenshot();
              await resolve.quit();
            })
    }
  }
}
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
