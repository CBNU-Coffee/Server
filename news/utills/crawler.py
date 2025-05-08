import requests
from bs4 import BeautifulSoup
import time
from news.models import News

def crawl_and_save(keyword='복지', pages=1):
    headers = {'User-Agent': 'Mozilla/5.0'}
    for page in range(1, pages + 1):
        url = f"https://search.naver.com/search.naver?where=news&query={keyword}&start={(page - 1)*10 + 1}"
        res = requests.get(url, headers=headers)
        soup = BeautifulSoup(res.text, 'html.parser')
        items = soup.select('.list_news .news_area')

        for item in items:
            tag = item.select_one('.news_tit')
            if tag:
                title = tag['title']
                link = tag['href']
                content = title  # 지금은 본문 대신 제목 저장 (나중에 본문 크롤링 추가 가능)
                if not News.objects.filter(link=link).exists():
                    News.objects.create(title=title, link=link, content=content, media='네이버')
                    print(f"저장: {title}")
            time.sleep(0.5)