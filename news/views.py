from django.shortcuts import render
from django.http import JsonResponse
from .utills.crawler import *

def index(request):
    return render(request,'main.html')

def search(request):
    start(content=request.POST.get('content'))
    return render(request, 'result.html')

def content(request):
    return render(request, 'detail.html')