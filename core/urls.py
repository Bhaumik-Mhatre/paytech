from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signin', views.signin, name='signin'),
    path('signup', views.signup, name='signup'),
    path('logout', views.user_logout, name='logout' ),
    path('chat', views.chat, name='chat'),
    path('tickets', views.tickets, name='tickets')
]
