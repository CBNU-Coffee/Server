from django.db import models

class News(models.Model):
    News_title=models.CharField(max_length=200)
    News_summary=models.TextField(blank=True)
    News_content=models.TextField()
    News_day=models.DateTimeField()
    News_url=models.URLField(unique=True)
