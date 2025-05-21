import requests
from bs4 import BeautifulSoup
import time
# from news.models import News

# database.py에서 init_db, insert_news 가져오기
from news.utills.database import init_db, insert_news, clear_table

def crawling(keyword: str = '복지', page: int = 3):
    # 테이블 준비
    init_db()
    clear_table()

    headers = {
        'User-Agent': (
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
            'AppleWebKit/537.36 (KHTML, like Gecko) '
            'Chrome/73.0.3683.86 Safari/537.36'
        )
    }

    for i in range(1, page):
        url = (
            f"https://search.hankookilbo.com/Search?"
            f"Page={i}&tab=NEWS&sort=relation"
            f"&searchText={keyword}"
            "&searchTypeSet=TITLE,CONTENTS"
            "&selectedPeriod=%EC%A0%84%EC%B2%B4&filter=head"
        )
        response = requests.get(url, headers=headers)
        response.encoding = 'utf-8'

        if response.status_code == 200:
            soup   = BeautifulSoup(response.text, 'html.parser')
            titles = soup.select("h3.board-list.h3.mb_only a")
            items  = soup.select("div.text")

            # ——— 1) 모든 제목을 쭉 출력 ———
            print(f"\n=== Page {i} Titles ===")
            for idx, t in enumerate(titles, start=1):
                print(f"{idx}. {t.get_text().strip()}")

            # ——— 2) 모든 본문을 쭉 출력 ———
            print(f"\n=== Page {i} Bodies ===")
            for idx, b in enumerate(items, start=1):
                print(f"{idx}. {b.get_text().strip()}")

            # ——— 3) 여기서 두 리스트를 짝지어 실제 처리합니다 ———
            print(f"\n=== Page {i} Save to DB ===")
            for idx, (t, b) in enumerate(zip(titles, items), start=1):
                title_text = t.get_text().strip()
                body_text  = b.get_text().strip()
                summary    = body_text[:50] + '…' if len(body_text) > 50 else body_text

                # DB에 저장
                insert_news(keyword, title_text, body_text, summary)
                print(f"[{idx}] Saved: {title_text}")

            # 페이지 간 잠시 대기
            time.sleep(0.1)
        else:
            print(f"크롤링 실패: status {response.status_code}")

# ▶ 스크립트를 직접 실행할 때 크롤링 함수 호출
if __name__ == '__main__':
    crawling('복지', 10)
