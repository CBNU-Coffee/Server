from django.core.management.base import BaseCommand
from news.utils.crawler import crawl_and_save

class Command(BaseCommand):
    help = '복지 뉴스 크롤링'

    def handle(self, *args, **kwargs):
        crawl_and_save(keyword='복지', pages=2)