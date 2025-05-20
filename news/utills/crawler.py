import requests
from bs4 import BeautifulSoup
import time
#from news.models import News

def crawling(keyword = '복지', page = 3):
    headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    for i in range(1, page):
        url = f"https://search.hankookilbo.com/Search?Page={i}&tab=NEWS&sort=relation&searchText={keyword}&searchTypeSet=TITLE,CONTENTS&selectedPeriod=%EC%A0%84%EC%B2%B4&filter=head"
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            html = response.text
            soup = BeautifulSoup(html, 'html.parser')
            titles = soup.select("h3.board-list.h3.mb_only a")
            items = soup.select("div.text")
            for tag in titles:
                print(tag.get_text())
                time.sleep(0.1)
            for tag in items:
                print(tag.get_text())
                time.sleep(0.1)
        else:
            print("크롤링 실패")
