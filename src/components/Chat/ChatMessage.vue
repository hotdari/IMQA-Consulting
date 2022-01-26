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

const fs = require('fs')


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
    // test : async function () {
    //   driver.then(resolve => resolve.build())
    //         .then(resolve => {
    //           resolve.get("http://www.google.com")
    //           return resolve;
    //         })
    //         .then(resolve => {
    //           resolve.findElement(webdriver.By.name("q")).sendKeys('webdriver')
    //           return resolve;
    //         })
    //         .then(resolve => {
    //           resolve.findElement(webdriver.By.name("btnK")).click();
    //           return resolve;
    //         })
    //         .then(async resolve => {
    //           await resolve.wait(webdriver.until.elementLocated(webdriver.By.id("rso")), 5000);
    //           await resolve.findElement(webdriver.By.id("rso")).takeScreenshot();
    //           await resolve.quit();
    //         })
    // }
    test : async function () {
      driver.then(resolve => resolve.build())
        .then(async resolve => {
          await resolve.get("http://ote-mpm.imqa.io/")
          await resolve.manage().addCookie({
            name: 'IMQA_OTE_SESSION',
            value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDM3Nzk4MDIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW5AaW1xYS5pbyIsImVtYWlsIjoiYWRtaW5AaW1xYS5pbyIsIm5pY2tuYW1lIjoi6rSA66as7J6QIiwiaXNfc3VwZXJ1c2VyIjoxLCJ1c2VyX3R6Ijo5LCJpYXQiOjE2NDMxNzUwMDIsImlzcyI6Im1wbS5pbXFhLmlvIiwic3ViIjoibXBtIn0.p-3DmsHjkhHpf-KwoRByjTJNSkePjEu05h4IpmCaUsA',
            domain: '.imqa.io',
            path: '/',
            secure: false
          });
          return resolve;
        })
        .then(async resolve => {
          await resolve.get("http://ote-mpm.imqa.io/mpm/32/management/reference")
          await resolve.wait(webdriver.until.elementLocated(webdriver.By.className("setting-body")), 5000);
          await resolve.findElement(webdriver.By.className("setting-body")).takeScreenshot().then(img => {
            fs.writeFile('write_test_file.png', img, 'base64',(err) => {
              // In case of a error throw err.
              if (err) throw err;
            })
          });
          await resolve.request('POST', 'http://ote-mpm.imqa.io/api/reference_value/32', data = {"crash_warning":0,"crash_danger":0,"ui_value":0,"ui_warning":0,"ui_danger":0,"webview_value":0,"webview_warning":0,"webview_danger":0,"response_value":0,"response_warning":0,"response_danger":0,"cpu_value":0,"cpu_warning":0,"cpu_danger":0,"memory_value":0,"memory_warning":0,"memory_danger":0})
          await resolve.wait(webdriver.until.elementLocated(webdriver.By.className("setting-body")), 5000);
          await resolve.findElement(webdriver.By.className("setting-body")).takeScreenshot().then(img => {
            fs.writeFile('write_test_file2.png', img, 'base64',(err) => {
              // In case of a error throw err.
              if (err) throw err;
            })
          });
          // return resolve;
        })
        // .then(async resolve => {
        //   await resolve.quit();
        // })
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
