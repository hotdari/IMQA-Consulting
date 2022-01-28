module.exports = {
  slide : [
    {
      title: "<p>아리따움 성능 리포트</p>",
      desc: "어니컴 성능솔루션 사업부",
      logo: "onycom.png",
      image: "main.png"
    },
    {
      title: "이슈 요약",
      desc: "<p>시급히 먼저 해결해야 하는 것들</p>" +
        "<p><br/></p>" +
        "<p>• JavaScript 다운로드 시 속도 지연 문제 해결 방안 마련</p>" +
        "<p> 많은 JavaScript를 다운로드 받지 않게, 일단 내부적으로 경량화 하는 것이 필요해 보임</p>" +
        "<p> 그리고 네트워크 속도가 빠른 곳에 JavaScript를 위치 하는 것이 필요함</p>" +
        "<p><br/></p>" +
        "<p>• 제품 이미지 다운로드 시 지연 발생 건이 다수</p>" +
        "<p> /UPLOAD/ 폴더 안에 이미지를 다운로드 받는데 오래 걸리는 이슈</p>" +
        "<p> 제품의 이미지를 품질 해치지 않으면서, 압축해서 저장하는 포멧 사용을 권고함.</p>" +
        "<p><br/></p>" +
        "<p>이미지 최적화 및 경량화하는 라이브러리의 도움이 필요함</p>" +
        "<p><br/></p>" +
        "<p>디바이스 사이즈에 대응하는 이미지 리사이징 전략을 이용하여 리소스 최적화 방안 마련 필요</p>",
      image: ""
    },
    {
      title: "3.3.0",
      desc: "<p>화면 로딩시간 :</p>" +
        "<p><br/></p>" +
        "<p>웹뷰 화면 로딩시간:</p>" +
        "<p>화면에 로딩 지연 시간이 많이 발생함.</p>" +
        "<p>주로 결재나 카트 부분이 느림</p>" +
        "<p>상세한 부분은 뒤에서 언급함.</p>" +
        "<p></p>" +
        "<p>응답시간 : </p>" +
        "<p>대체로 양호한 상황</p>" +
        "<p><br/></p>" +
        "<p>CPU 사용량:</p>" +
        "<p>대부분은 50% 이하로 양호하나 4% 정도는</p>" +
        "<p>CPU 과다 사용구간이 존재함.</p>" +
        "<p><br/></p>" +
        "<p>메모리 사용량:</p>" +
        "<p>100MB 이상 사용하는 구간이 약 4% 존재함.</p>",
      image: "report_01.png"
    },
  ]
}
