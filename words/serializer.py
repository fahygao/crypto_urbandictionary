from rest_framework import serializers
from . models import *


class WordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Definition
        fields = ['word','definition','example','pub_date','creator','upvotes','downvotes']