from django.db import models

<<<<<<< Updated upstream
class News(models.Model):
    News_title=models.CharField(max_length=200)
    News_summary=models.TextField(blank=True)
    News_content=models.TextField()
    News_day=models.TextField()
    News_url=models.TextField()
    News_keyword=models.TextField(blank=True)


class User(models.Model):
    User_ID=models.CharField()
    User_Password=models.TextField()
=======
class Headline(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    keyword = models.CharField(max_length=100)  # 검색 키워드 저장용
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
>>>>>>> Stashed changes
