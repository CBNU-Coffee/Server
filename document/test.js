// 메인 → 결과 페이지 이동
function goToResults() {
  const keyword = document.getElementById("mainSearchInput").value;
  if (!keyword.trim()) {
    alert("검색어를 입력하세요!");
    return;
  }
  window.location.href = `result.html?keyword=${encodeURIComponent(keyword)}`;
}

// 결과 페이지 로드 시 실행
function loadResultsPage() {
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("keyword");
  if (!keyword) return;

  // 임시 테스트용 더미 헤드라인 데이터
  const headlines = [
    `${keyword} 관련 헤드라인 1`,
    `${keyword} 관련 헤드라인 2`,
    `${keyword} 관련 헤드라인 3`,
    `${keyword} 관련 헤드라인 4`,
    `${keyword} 관련 헤드라인 5`
  ];

  const container = document.getElementById("resultsContainer");
  const template = document.getElementById("headlineTemplate");

  headlines.forEach(title => {
    const clone = template.content.cloneNode(true);
    const item = clone.querySelector(".headline-item");
    item.textContent = title;
    item.onclick = () => goToDetail(title);
    container.appendChild(clone);
  });
}

// 결과 → 상세 페이지 이동
function goToDetail(headline) {
  window.location.href = `detail.html?title=${encodeURIComponent(headline)}`;
}

// 상세 페이지 로드 시 실행
function loadDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");
  if (!title) return;

  document.getElementById("detailTitle").innerText = title;
}

// 페이지 뒤로가기 (결과 목록으로)
function goBack() {
  window.history.back();
}
