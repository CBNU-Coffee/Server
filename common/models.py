from django.db import models

class User(models.Model):
    User_ID=models.CharField()
    User_Password=models.TextField()