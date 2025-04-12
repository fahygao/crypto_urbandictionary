from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('vote/', views.vote, name='vote'),
    path('submission/', views.submission_view, name='submission'),
    path('submit-word/', views.submit_word, name='submit_word'),
] 