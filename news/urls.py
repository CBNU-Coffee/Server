from django.urls import path
from .views import *
from . import views

app_name = 'news'

urlpatterns = [
#    path('', views.main, name = "home"),
#    path('search/', views.search, name='search'),
#    path('news/<int:news_id>/', views.detail, name='detail'),
#    path('', index, name = "Test"),
    path('', views.main, name="main"),
    path('result/', views.search, name="result"),
    path('detail/<int:news_id>/', views.detail, name="detail"),
]

urlpatterns = [
    path('', views.index, name='index'),          # 메인 페이지
    path('search/', views.search, name='search'), # 검색 결과 페이지
    path('detail/<int:pk>/', views.detail, name='detail'),  # 상세 페이지
]
