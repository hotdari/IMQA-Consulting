import test from "../db/dao";
import pptxgen from "pptxgenjs";
const html2pptxgenjs = require('html2pptxgenjs');

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

class PptModel {
  constructor() {
    this.pptx = new pptxgen();
    this.content = {};
    this.local_path = "file:///Users/id-yunseol/Desktop/image";
    this.custom_path = "aritaum_3.3.0";
    this.defaultTextStyle = {
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
      underline: false,
      // strike: "",
    }
  }

  addSlide(){
    return this.pptx.addSlide();
  }

  slideCover(payload){
    // 2. Add a Slide
    let slide = this.addSlide();

    // 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
    // title
    slide.addText(this.textParse(payload.title, {fontSize: 32, strike: false}), {
      ...this.defaultTextStyle,
      x: "3%",
      y: "30%",
      bold: true
    });
    // desc
    slide.addText(this.textParse(payload.desc, {fontSize: 12}), {
      ...this.defaultTextStyle,
      x: "3%",
      y: "80%"
    });
    // logo
    slide.addImage({ x: "3%", y: "5%", w: "12%", h: "3%", path: `${this.local_path}/${payload.logo}` });
    // background
    slide.addImage({ x: "60%", y: "45%", w: "40%", h: "50%", path: `${this.local_path}/${payload.image}` });
  }

  slideSummary(payload) {
    // 2. Add a Slide
    let slide = this.addSlide();

    // 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
    // title
    slide.addText(this.textParse(payload.title, {fontSize: 20}), {
      ...this.defaultTextStyle,
      x: "5%",
      y: "5%",
      w: "90%",
      h: "10%",
      bold: true,
      shadow: { type: "outer", color: "696969", blur: 3, offset: 2, angle: 45 }
    });
    // desc
    slide.addText(this.textParse(payload.desc, {fontSize: 12}), {
      ...this.defaultTextStyle,
      x: "5%",
      y: "15%",
      w: "80%",
      h: "70%"
    });
  }

  slideContent(payload) {
    // 2. Add a Slide
    let slide = this.addSlide();

    // 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
    // title
    slide.addText(this.textParse(payload.title, {fontSize: 16}), {
      ...this.defaultTextStyle,
      x: 0,
      y: 0,
      w: "20%",
      h: "5%",
      align: "center",
      fill: "f5cf45",
      bold: true
    });
    // desc
    slide.addText(this.textParse(payload.desc, {fontSize: 10}), {
      ...this.defaultTextStyle,
      x: "3%",
      y: "10%",
      w: "30%",
      h: "85%"
    });
    // report - image
    slide.addImage({ x: "40%", y: 0, w: "60%", h: "100%", path: `${this.local_path}/${this.custom_path}/${payload.image}` });
  }

  textParse(text, option){
    text = text.replace(/<(p)([^>]*)>/gi,""); // <p> 제거
    text = text.replace(/<(\/br|br)([^>]*)>/gi,""); // <br> 제거
    text = text.replace(/<(\/p)([^>]*)>/gi,"<br>"); // </p> -> <br>태그
    return html2pptxgenjs.htmlToPptxText(text, {...option});
  }

  convertPptx(payload){
    this.slideCover(payload[0]);
    this.slideSummary(payload[1]);

    for(let i = 2; i < payload.length; i++){
      this.slideContent(payload[i]);
    }
  }

  createPptx(payload){
    // test.insert();

    test.select(payload).then(data => {
      this.content = JSON.parse(data.content);
      this.convertPptx(content.slide);

      // 4. Save the Presentation
      this.pptx.writeFile();
    });

  }
}

const ppt = new PptModel();
export default ppt;
