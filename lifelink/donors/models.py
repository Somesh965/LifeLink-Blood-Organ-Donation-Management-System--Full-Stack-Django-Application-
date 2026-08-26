from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
# Create your models here.



class Donor(models.Model):

    BLOOD_STATUS_CHOICES = [
        ("Available", "Available"),
        ("Unavailable", "Unavailable"),
    ]

    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name="donor")

    weight = models.DecimalField(max_digits=5, decimal_places=2)

    last_donation_date = models.DateField(null=True,blank=True)

    medical_conditions = models.TextField(blank=True)

    emergency_contact_name = models.CharField(max_length=100)

    emergency_contact_number = models.CharField(max_length=15)

    availability_status = models.CharField(max_length=20,choices=BLOOD_STATUS_CHOICES,default="Available")

    is_eligible = models.BooleanField(default=True)

    def __str__(self):
        return self.user.get_full_name() or self.user.username
