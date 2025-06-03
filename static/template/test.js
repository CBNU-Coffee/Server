// 메인 페이지에서 검색어 입력 후 결과 페이지 이동
function goToResults() {
  const keyword = document.getElementById("mainSearchInput").value.trim();
  if (!keyword) {
    alert("검색어를 입력하세요!");
    return;
  }
  // Django URL 패턴에 맞춰서 쿼리스트링으로 이동
  window.location.href = `/search/?keyword=${encodeURIComponent(keyword)}`;
}

// 결과 페이지 로드 시 실행, 검색어가 없으면 메시지 출력
function loadResultsPage() {
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("keyword");

  if (!keyword || !keyword.trim()) {
    const container = document.getElementById("resultsContainer");
    container.innerHTML = "<p>검색어가 없습니다. 메인 페이지로 돌아가 주세요.</p>";
    return;
  }

  // 참고: Django 뷰에서 받은 실제 결과를 템플릿에서 렌더링하는 것이 권장됨
  // 만약 JS에서 동적 렌더링이 필요하다면 아래 예시처럼 하되, 실제 사용 시 서버 데이터로 대체 필요
  // 따라서 크롤링 완성 후 수정 예정정
  const headlines = [
    `${keyword} 관련 헤드라인 1`,
    `${keyword} 관련 헤드라인 2`,
    `${keyword} 관련 헤드라인 3`
  ];

  const container = document.getElementById("resultsContainer");
  container.innerHTML = ""; // 초기화

  headlines.forEach(title => {
    const div = document.createElement("div");
    div.textContent = title;
    div.classList.add("headline-item");
    div.style.cursor = "pointer";
    div.onclick = () => goToDetail(title);
    container.appendChild(div);
  });
}

// 상세 페이지에서 텍스트를 음성으로 읽어주는 함수 (TTS) // 이건 api 사용 예정
function readText(text) {
  if (!text) return;
  const synth = window.speechSynthesis;
  if (synth.speaking) {
    synth.cancel();
  }
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ko-KR';
  synth.speak(utter);
}
