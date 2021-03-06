module.exports = {
  content : [
    {
      "id": 0,
      "user": "IMQA Bot",
      // "time": "오후 1:11",
      "body": "<p>컨설팅 진행을 도와드리겠습니다</p><p>아리따움 프로젝트의 컨설팅을 시작하시겠습니까?</p>",
      "action": "<button data-event='startConsulting' class='btn btn-primary btn-sm'>네. 시작할게요</button><button data-event='cancelConsulting' class='btn btn-secondary btn-sm'>취소합니다</button>"
    },
    {
      "id": 1,
      "user": "IMQA Bot",
      // "time": "오후 1:11",
      "body": "<p>앱버전을 선택해주세요.</p>",
      "action": "<select data-event='selectVersion'><option value='1.0'>1.0</option><option value='2.0'>2.0</option></select><div class='mt-1'><button data-event='startVersion' class='btn btn-primary btn-sm'>선택된 버전으로 시작합니다.</button><button data-event='cancelVersion' class='btn btn-secondary btn-sm'>취소합니다</button></div>"
    },
    {
      "id": 2,
      "user": "IMQA Bot",
      // "time": "오후 1:11",
      "body": "<p>달력을 눌러 컨설팅 기간을 선택해주세요.</p>",
      "action": "<input type='date'></input><div class='mt-1'><button data-event='startDate' class='btn btn-primary btn-sm'>선택된 기간으로 시작합니다.</button><button data-event='cancelDate' class='btn btn-secondary btn-sm'>취소합니다</button></div>"
    }
  ]
}
