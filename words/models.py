from datetime import datetime 
from django.db import models
from django.contrib.auth.models import User


class Definition(models.Model):
    word = models.CharField(max_length=200)
    definition = models.TextField()
    example = models.TextField(blank=True, null=True)
    pub_date = models.DateTimeField('date published', auto_now_add=True)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)
    creator = models.TextField(max_length=300, blank=True)
    is_approved = models.BooleanField(default=False)
    
    def __str__(self):
        return self.word