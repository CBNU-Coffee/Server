from django.urls import path
from . import views

app_name = 'news'

urlpatterns = [
#    path('', views.main, name = "home"),
#    path('search/', views.search, name='search'),
#    path('news/<int:news_id>/', views.detail, name='detail'),
    path('test1', views.test1, name="tet_yaho~"),
    path('test2', views.test2, name="tst_yaho~"),
    path('test3', views.test3, name="tes_yaho~"),
]
