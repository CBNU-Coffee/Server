from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import News
"""
def test1(request):
    return render(request, 'news/mainpage.html')

def test2(request):
    return render(request, 'news/resultpage.html')

def test3(request):
    return render(request, 'news/newspage.html')

    def search(request):
    keyword = request.GET.get('keyword').strip()
    headlines=News.objects.filter(News_title__icontains=keyword) if keyword else []
    return render(request, 'news/resultpage.html', {
        'keyword': keyword, 
        'headlines': headlines
    })
"""

def main(request):
    return render(request,'news/mainpage.html')

def search(request):
    keyword = request.GET.get('keyword')
    
    if keyword:
        keyword = keyword.strip()
        headlines = News.objects.filter(News_title__icontains=keyword)
    else:
        headlines = []
    
    return render(request, 'news/resultpage.html', {
        'keyword': keyword or '',
        'headlines': headlines
    })

def detail(request, news_id):
    article = get_object_or_404(News, pk=news_id)
    return render(request, 'news/newspage.html', {'article': article})

