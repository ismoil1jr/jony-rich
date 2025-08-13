from django.shortcuts import redirect
from django.urls import path, re_path
from .views import home

def redirect_to_home(request, *args, **kwargs):
    return redirect('home')

urlpatterns = [
    path('', home, name='home'),
    re_path(r'^.*$', redirect_to_home),  # qolgan hamma URL'ni bosh sahifaga qaytaradi
]
