// ✅ 메인 페이지에서 검색 후 결과 페이지로 이동
function goToResults() {
  const keyword = document.getElementById("mainSearchInput").value.trim();
  if (!keyword) {
    alert("검색어를 입력하세요!");
    return;
  }
  window.location.href = `/search/?keyword=${encodeURIComponent(keyword)}`;
}

// ✅ 결과 페이지 로드시 실행 (검색어 없을 경우 안내)
function loadResultsPage() {
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("keyword");

  if (!keyword || !keyword.trim()) {
    const container = document.getElementById("resultsContainer");
    container.innerHTML = "<p>검색어가 없습니다. 메인 페이지로 돌아가 주세요.</p>";
    return;
  }

  // 예시 데이터 (향후 서버 데이터로 대체 예정)
  const headlines = [
    `${keyword} 관련 헤드라인 1`,
    `${keyword} 관련 헤드라인 2`,
    `${keyword} 관련 헤드라인 3`
  ];

  const container = document.getElementById("resultsContainer");
  container.innerHTML = "";

  headlines.forEach(title => {
    const div = document.createElement("div");
    div.textContent = title;
    div.classList.add("headline-item");
    div.style.cursor = "pointer";
    div.onclick = () => goToDetail(title); // 이 함수가 있다면 정의 필요
    container.appendChild(div);
  });
}

// ✅ HTML에서 직접 호출되는 탭 전환 함수
window.showTab = function (tab) {
  const fullContent = document.getElementById('full');
  const summaryContent = document.getElementById('summary');
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(t => {
    if (t.dataset.tab === tab) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });

  if (tab === 'full') {
    fullContent.classList.add('active');
    summaryContent.classList.remove('active');
  } else {
    summaryContent.classList.add('active');
    fullContent.classList.remove('active');
  }
};

// ✅ HTML에서 호출되는 TTS 읽기 기능 (브라우저 내장)
window.readText = function (text) {
  if (!text) return;
  const synth = window.speechSynthesis;
  if (synth.speaking) synth.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ko-KR';
  synth.speak(utter);
};

// ✅ 향후 API 연동용: 현재 탭의 텍스트 읽기 (API 호출용)
function readCurrentTabText() {
  const currentTab = document.querySelector('.tab-content.active');
  const text = currentTab ? currentTab.innerText.trim() : '';

  console.log("API로 보낼 텍스트:", text);

  // 향후 예시: API 호출
  // fetch('/tts-api/', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ text })
  // });
}
