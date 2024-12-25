from datetime import datetime 
from django.db import models


class Definition(models.Model):
    word = models.CharField(max_length=100)
    definition = models.TextField(max_length=300, blank=True)
    pub_date = models.DateTimeField("Date created at", default=datetime.now, blank=True)
    creator = models.TextField(max_length=300, blank=True)
    
    def __str__(self):
        return self.word