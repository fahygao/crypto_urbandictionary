from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *


class WordsView(APIView):
    serializer_class = WordsSerializer
    def get(self, request):
        output = [{"word": output.word, 
            "Definition": output.definition}
            for output in Definition.objects.all()]
        return Response(output)

    def post(self,request):
        serializer = WordsSerializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)
