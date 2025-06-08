from django.db import models

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
