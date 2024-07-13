from django.urls import path
from . import views

urlpatterns = [
  path('', views.home, name='home-page'),
  path('get_agents/', views.get_agents, name='get-agents'),
  path('get_maps/', views.get_maps, name='get-maps')
]