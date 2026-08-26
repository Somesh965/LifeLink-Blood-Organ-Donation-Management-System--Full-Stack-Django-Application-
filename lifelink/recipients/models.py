from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class Recipient(models.Model):
    REQUEST_TYPE = [
        ('Blood', 'Blood'),
        ('Organ', 'Organ'),
    ]

    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='recipient')

    request_type = models.CharField(max_length=10, choices=REQUEST_TYPE)

    hospital_name = models.CharField(max_length=150)

    diagnosis = models.TextField(blank=True)

    emergency_contact_name = models.CharField(max_length=100)

    emergency_contact_number = models.CharField(max_length=15)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.user.get_full_name() or self.user.username
