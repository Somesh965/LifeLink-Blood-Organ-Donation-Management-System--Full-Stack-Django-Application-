from django.db import models
from accounts.models import User
# Create your models here.



class Hospital(models.Model):

    STATUS_CHOICES = [
        ("Active", "Active"),
        ("Inactive", "Inactive"),
    ]

    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name="hospital")

    hospital_name = models.CharField(max_length=200)

    registration_number = models.CharField(max_length=100,unique=True)

    hospital_type = models.CharField(max_length=100)

    contact_person = models.CharField(max_length=100)

    phone_number = models.CharField(max_length=15)

    email = models.EmailField()

    address = models.TextField()

    city = models.CharField(max_length=100)

    state = models.CharField(max_length=100)

    pincode = models.CharField(max_length=10)

    emergency_contact = models.CharField(max_length=15)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Active")

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["hospital_name"]

    def __str__(self):
        return self.hospital_name
