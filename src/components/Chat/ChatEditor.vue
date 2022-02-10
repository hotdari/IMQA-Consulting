<template>
  <div>
    <quillEditor v-model="content"
                 ref="quillEditor"
                 :options="editorOption"></quillEditor>
    <p class="guide_txt">Control(Command) + Enter(Return) 키를 눌러 데이터를 보냅니다.</p>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
	name: "ChatEditor",
	components: {
		quillEditor
	},
	data(){
		return {
			editorOption: {
				theme: "snow",
				modules: {
					keyboard: {
						bindings: {
							controlEnter: {
								key: 13,
								shortKey: true,
								handler: () => { this.sendMessage(); }
							}
						}
					}
				}
			},
			content: ""
		};
	},
	methods: {
		sendMessage(){
			console.log(this.content);
			this.content = "";
			this.$emit("send");
		}
	}
};
</script>

<style lang="scss" scoped>
  .guide_txt{
    text-align: right;
    font-size: 12px;
    padding:2px 8px;
    margin: 0;
  }
</style>
