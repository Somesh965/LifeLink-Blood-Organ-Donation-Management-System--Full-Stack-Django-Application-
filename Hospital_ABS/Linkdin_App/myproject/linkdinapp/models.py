from django.db import models
from django.forms import ModelForm
# Create your models here.
class StudentsModel(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    marks = models.IntegerField()
    education = models.CharField(max_length=100)
    college = models.CharField(max_length=100)
    def __str__(self):
        return self.name
