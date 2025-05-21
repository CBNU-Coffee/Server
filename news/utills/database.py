# news/utills/database.py

import sqlite3
from pathlib import Path

# ▶ 1) DB 파일 경로 설정
#    이 파일(news/utills/database.py) 위치에서
#    manage.py와 db.sqlite3가 있는 프로젝트 루트로 올라갑니다.

#DB_PATH = Path(r"C:\SQLite\databaseCoffee.sqlite")

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
DB_PATH      = PROJECT_ROOT / 'db.sqlite3'

# ▶ 2) 커넥션 헬퍼: 중복 코드를 줄이고, 컬럼명 접근 편의를 위해 Row 팩토리 설정
def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# ▶ 3) 테이블 생성: 이미 HeidiSQL에서 만드셨다면 호출 생략 가능
def init_db():
    sql = """
    CREATE TABLE IF NOT EXISTS crawled_news (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      keyword  TEXT    NOT NULL,
      title    TEXT    NOT NULL,
      body     TEXT    NOT NULL,
      summary  TEXT
    );
    """
    with get_connection() as conn:
        conn.execute(sql)

#값 누적 방지
def clear_table():
    """기존 저장된 모든 레코드를 삭제합니다."""
    with get_connection() as conn:
        conn.execute("DELETE FROM crawled_news;")

# ▶ 4) INSERT 함수: crawler.py에서 호출할 시그니처에 맞춥니다
def insert_news(keyword: str,
                title:   str,
                body:    str,
                summary: str = None):
    sql = """
    INSERT INTO crawled_news (keyword, title, body, summary)
    VALUES (?, ?, ?, ?);
    """
    with get_connection() as conn:
        conn.execute(sql, (keyword, title, body, summary))

# ▶ 5) (선택) 전체 조회 함수: 저장된 데이터를 확인하고 싶을 때 사용
def fetch_all():
    sql = "SELECT * FROM news ORDER BY id DESC;"
    with get_connection() as conn:
        return conn.execute(sql).fetchall()

# ▶ 이 모듈을 직접 실행할 때: 테이블 생성 확인용
if __name__ == '__main__':
    init_db()
    print("✅ news 테이블이 준비되었습니다. 경로:", DB_PATH)
