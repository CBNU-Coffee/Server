import requests
from bs4 import BeautifulSoup
import time
from transformers import PreTrainedTokenizerFast, BartForConditionalGeneration
from news.models import News

print("==== 크롤러 실행 시작 ====")


# 모델 로드
tokenizer = PreTrainedTokenizerFast.from_pretrained('gogamza/kobart-base-v2')
model = BartForConditionalGeneration.from_pretrained('gogamza/kobart-summarization')

def crawling(keyword='복지', page=3):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    all_titles = []
    all_contents = []
    all_day = []
    all_news_url = []

    print("크롤러 실행 중...")
    
    for i in range(1, page):
        url = f"https://search.hankookilbo.com/Search?Page={i}&tab=NEWS&sort=relation&searchText={keyword}&searchTypeSet=TITLE,CONTENTS&selectedPeriod=%EC%A0%84%EC%B2%B4&filter=head"
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            html = response.text
            soup = BeautifulSoup(html, 'html.parser')
            titles = soup.select("h3.board-list.h3.mb_only a")
            items = soup.select("div.text")
            day = soup.select("p.date.mb_only em")
            news_url = soup.select("h3.board-list.h3.mb_only a")

            # 제목 저장
            for tag in titles:
                title_text = tag.get_text().strip()
                all_titles.append(title_text)
                time.sleep(0.1)
            
            # 내용 저장
            for tag in items:
                content_text = tag.get_text().strip()
                all_contents.append(content_text)
                time.sleep(0.1)

            #날짜 저장
            for tag in day:
                day_text = tag.string.strip()
                all_day.append(day_text)
                time.sleep(0.1)

            #뉴스 url 저장
            for tag in news_url:
                news_url_text = tag['href'].strip()
                all_news_url.append(news_url_text)
                time.sleep(0.1)
        else:
            print(f"페이지 {i} 크롤링 실패: 상태 코드 {response.status_code}")
    
    return all_titles, all_contents, all_day, all_news_url

def summarize_text(text):
    """텍스트를 요약하는 함수"""
    
    try:
        input_ids = tokenizer.encode(text, return_tensors="pt", max_length=1024, truncation=True)
        summary_ids = model.generate(
            input_ids,
            max_length=128,
            min_length=30,
            num_beams=4,
            length_penalty=1.5,
            repetition_penalty=2.0,
            no_repeat_ngram_size=3,
            early_stopping=True
        )
        summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        return summary
    except Exception as e:
        return f"요약 중 오류 발생: {e}"

# 메인 실행 코드
# 기본값으로 설정된 키워드와 페이지 수 사용
if __name__ == "__main__":
    titles, contents, days, news_urls = crawling(keyword='복지', page = 2)

    print("\n===== 요약 결과 =====")
    for i, (title, content, day, news_url) in enumerate(zip(titles, contents, days, news_urls)):
        print(f"\n[기사 {i+1}]\n")
        print(f"제목: {title}\n")
        
        summary = summarize_text(content)
        print(f"요약: {summary}\n")
        print(f"본문: {content}\n")
        print(f"날짜: {day}\n")
        print(f"url: {news_url}")
        print("-" * 50)

        a=News(
            News_title=title,
            News_summary=summary,
            News_content=content,
            News_day=day,
            News_url=news_url
        )
        a.save()




