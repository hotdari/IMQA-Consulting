
export class ActionViewUtil {
  static combineInnerView(arr) {
    let firstAV = null;
    var tmp = null;
    arr.forEach(view=>{
      if(firstAV == null) {
        firstAV = view;
      }
      if(tmp == null) {
        tmp = view;
      } else {
        tmp.setNextAction(view);
        tmp = view;
      }
    })
    return firstAV;
  }

  static getTxId() {
    /**
     * UUID 난수 생성
     * @returns {string}
     */
    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    return uuidv4();
  }

}
