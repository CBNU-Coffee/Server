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

  // 검색어가 있을 경우 API 호출하여 결과 가져오기
  fetch(`/api/search_results/?keyword=${encodeURIComponent(keyword)}`)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("resultsContainer");
    container.innerHTML = "";

    if (data.headlines.length === 0) {
      container.innerHTML = "<p>검색 결과가 없습니다.</p>";
      return;
    }

    data.headlines.forEach(title => {
      const div = document.createElement("div");
      div.textContent = title;
      div.classList.add("headline-item");
      div.style.cursor = "pointer";
      div.onclick = () => goToDetail(title);
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error("검색 결과 불러오기 실패:", error);
  });
}

// 상세 페이지에서 텍스트를 음성으로 읽어주는 함수 (TTS)
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

// 상세 페이지에서 뒤로가기 (이전 결과 페이지로 이동)
function goBack() {
  window.history.back();
}
