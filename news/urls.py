from django.urls import path
from .views import *

app_name = 'news'

urlpatterns = [
    path('', index, name = "main"),
    path('<str:search_keyword>/', search, name = "search"),
    path('<str:search_keyword>/content', content, name = "content"),
]