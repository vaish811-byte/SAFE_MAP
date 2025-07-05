# safety/urls.py

from django.urls import path
from .views import home, chat_support

urlpatterns = [
    path('', home, name='home'),
    path('chat-support/', chat_support, name='chat_support'),
]
