from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from .models import *
from django.contrib.auth.models import User

def sign_in(request):
    if request.method == "POST":
        email = request.POST.get('email')
        pwd = request.POST.get('password')
        print(email,pwd)
        x = User.objects.get(username=email)
        print(x.check_password(pwd))
        user = authenticate(request, username=email, password=pwd)
        print(user)
        if user is None:
            return render(request, 'common/sign_in.html', {"email":email})
        else:
            login(request, user=user)
            return redirect('news:tet_yaho~')
    else:
        return render(request, 'common/sign_in.html')

def sign_up(request):
    if request.method == "POST":
        User.objects.create_user(
            username = request.POST['email'],
            password=request.POST['password'],
            is_active=True,
        ).save()
        x = authenticate(request, username=request.POST['email'], password=request.POST['password'])
        print(x)
        return redirect('news:tet_yaho~')
    return render(request, 'common/sign_up.html')

def sign_out(request):
    logout(request)
    return redirect('news:tet_yaho~')