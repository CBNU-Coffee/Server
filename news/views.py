from django.shortcuts import render, get_object_or_404 
from django.http import HttpResponseBadRequest
from .models import News, Headline
"""
def main(request):
    return render(request,'news/main.html')

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

def index(request):
    return render(request,'index.html')

def search(request):
    keyword = request.GET.get('keyword')
    if not keyword:
        return HttpResponseBadRequest("검색어가 없습니다.")
    
    # DB에서 해당 키워드와 관련된 헤드라인들 가져오기 (간단한 LIKE 검색 예시)
    headlines = Headline.objects.filter(title__icontains=keyword).order_by('-created_at')[:50]

    return render(request, 'result.html', {
        'keyword': keyword,
        'headlines': headlines,
    })

def detail(request, pk):
    headline = get_object_or_404(Headline, pk=pk)
    return render(request, 'detail.html', {'headline': headline})
