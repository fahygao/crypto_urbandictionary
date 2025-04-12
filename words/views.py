from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
from django.views.decorators.csrf import csrf_exempt
from django.db.models import F
from django.contrib.auth.decorators import user_passes_test
from django.contrib import messages


def index(request):
    words = Definition.objects.all().order_by('-pub_date')
    word_count = words.count()
    return render(request, 'words/index.html', {
        'words': words,
        'word_count': word_count
    })


class WordsView(APIView):
    serializer_class = WordsSerializer
    def get(self, request):
        output = [{"word": output.word, 
            "Definition": output.definition,
            "example": output.example,
            "pub_date": output.pub_date,
            "creator": output.creator,
            "upvotes": output.upvotes,
            "downvotes": output.downvotes
            }
            for output in Definition.objects.all()]
        return Response(output)

    def post(self,request):
        serializer = WordsSerializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)


def about(request):
    return render(request, 'words/about.html')

@csrf_exempt
def vote(request):
    if request.method == 'POST':
        word_id = request.POST.get('word_id')
        vote_type = request.POST.get('vote_type')
        
        word = Definition.objects.get(id=word_id)
        if vote_type == 'up':
            word.upvotes = F('upvotes') + 1
        else:
            word.downvotes = F('downvotes') + 1
        word.save()
        
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'})

def is_admin(user):
    return user.is_authenticated and user.is_staff

@user_passes_test(is_admin)
def submission_view(request):
    return render(request, 'words/submission.html')

@csrf_exempt
def submit_word(request):
    if request.method == 'POST':
        word = request.POST.get('word')
        definition = request.POST.get('definition')
        example = request.POST.get('example', '')
        
        if len(definition.split()) < 10:
            return JsonResponse({
                'success': False,
                'error': 'Definition must be at least 10 words long.'
            })
            
        try:
            creator = request.user.username if request.user.is_authenticated else "Anonymous"
            new_word = Definition.objects.create(
                word=word,
                definition=definition,
                example=example,
                creator=creator
            )
            return JsonResponse({
                'success': True,
                'word_id': new_word.id,
                'creator': creator
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            })
            
    return JsonResponse({
        'success': False,
        'error': 'Invalid request method.'
    })
