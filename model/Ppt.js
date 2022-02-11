/**
 * PPT 생성
 */

import pptxgen from "pptxgenjs";
const html2pptxgenjs = require("html2pptxgenjs");

// // 1. Create a new Presentation
// let pptx = new pptxgen();
//
// // 2. Add a Slide
// let slide = pptx.addSlide();
//
// // 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
// let textboxText = "Hello World from PptxGenJS!";
// let textboxOpts = { x: 1, y: 1, color: "363636" };
// slide.addText(textboxText, textboxOpts);
//
// // 4. Save the Presentation
// pptx.writeFile();
//------------------------------------------------------------------------------
const content = {};
const local_path = "file:///Users/namsang-u/Desktop/workspace/IMQA-Consulting/report_dumy";
const custom_path = "aritaum_3.3.0";
const defaultTextStyle = {
	x: 5,
	y: 5,
	w: "50%",
	h: "10%",
	shrinkText: true,
	fontFace: "NanumGothic",
	baseline: 16,
	fontSize: 16,
	color: "1c1a1a",
	bold: false,
	italic: false,
	underline: false
	// strike: 'none',
};

export class Ppt {
	constructor() {
		this.pptx = new pptxgen();
	}

	savePpt(){
		// 4. Save the Presentation
		this.pptx.writeFile(this.title);
	}

	addSlide(){
		// 2. Add a Slide
		return this.pptx.addSlide();
	}

	slideCover(payload){
		const slide = this.addSlide();

		// 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
		// title
		slide.addText(this.textParse(payload.title, { fontSize: 32, strike: false }), {
			...defaultTextStyle,
			x: "3%",
			y: "30%",
			bold: true
		});
		// desc
		slide.addText(this.textParse(payload.desc, { fontSize: 12 }), {
			...defaultTextStyle,
			x: "3%",
			y: "80%"
		});
		// logo
		slide.addImage({ x: "3%", y: "5%", w: "12%", h: "3%", path: `${local_path}/${payload.logo}` });
		// background
		slide.addImage({ x: "60%", y: "45%", w: "40%", h: "50%", path: `${local_path}/${payload.image}` });
	}

	slideSummary(payload) {
		const slide = this.addSlide();

		// 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
		// title
		slide.addText(this.textParse(payload.title, { fontSize: 20 }), {
			...defaultTextStyle,
			x: "5%",
			y: "5%",
			w: "90%",
			h: "10%",
			bold: true,
			shadow: { type: "outer", color: "696969", blur: 3, offset: 2, angle: 45 }
		});
		// desc
		slide.addText(this.textParse(payload.desc, { fontSize: 12 }), {
			...defaultTextStyle,
			x: "5%",
			y: "15%",
			w: "80%",
			h: "70%"
		});
	}

	slideContent(payload) {
		const slide = this.addSlide();

		// 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
		// title
		slide.addText(this.textParse(payload.title, { fontSize: 16 }), {
			...defaultTextStyle,
			x: 0,
			y: 0,
			w: "20%",
			h: "5%",
			align: "center",
			fill: "f5cf45",
			bold: true
		});
		// desc
		slide.addText(this.textParse(payload.desc, { fontSize: 10 }), {
			...defaultTextStyle,
			x: "3%",
			y: "10%",
			w: "30%",
			h: "85%"
		});
		// report - image
		slide.addImage({ x: "40%", y: 0, w: "60%", h: "100%", path: `${local_path}/${custom_path}/${payload.image}` });
	}

	textParse(text, option){
		text = text.replace(/<(p)([^>]*)>/gi, ""); // <p> 제거
		text = text.replace(/<(\/br|br)([^>]*)>/gi, ""); // <br> 제거
		text = text.replace(/<(\/p)([^>]*)>/gi, "<br>"); // </p> -> <br>태그
		return html2pptxgenjs.htmlToPptxText(text, { ...option });
	}

	async convertPptx(payload){
		const content = JSON.parse(payload.content).slide;
		this.title = payload.title;

		await this.slideCover(content[0]);
		await this.slideSummary(content[1]);
		for(let i = 2; i < content.length; i++){
			await this.slideContent(content[i]);
		}
	}
}
