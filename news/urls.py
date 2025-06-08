from django.urls import path
from . import views

app_name = 'news'

urlpatterns = [
#    path('', views.main, name = "home"),
#    path('search/', views.search, name='search'),
#    path('news/<int:news_id>/', views.detail, name='detail'),
    path('', views.main, name="main"),
    path('result/', views.search, name="result"),
    path('detail/<int:news_id>/', views.detail, name="detail"),
]
