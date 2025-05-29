from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import News

def main(request):
    return render(request,'news/main.html')

def search(request):
    keyword = request.GET.get('keyword').strip()
    headlines=News.objects.filter(News_title__icontains=keyword) if keyword else []
    return render(request, 'news/result.html', {
        'keyword': keyword, 
        'headlines': headlines
    })

def detail(request, news_id):
    article = get_object_or_404(News, pk=news_id)
    return render(request, 'news/detail.html', {'article': article})
