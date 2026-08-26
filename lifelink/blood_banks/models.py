from django.db import models
from accounts.models import User
# Create your models here.


class BloodBank(models.Model):

    BLOOD_GROUP_CHOICES = [
        ("A+", "A+"),
        ("A-", "A-"),
        ("B+", "B+"),
        ("B-", "B-"),
        ("AB+", "AB+"),
        ("AB-", "AB-"),
        ("O+", "O+"),
        ("O-", "O-"),
    ]

    STATUS_CHOICES = [
        ("Open", "Open"),
        ("Closed", "Closed"),
    ]

    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name="blood_bank")

    blood_bank_name = models.CharField(max_length=200)

    license_number = models.CharField(max_length=100,unique=True)

    contact_person = models.CharField(max_length=100)

    phone_number = models.CharField(max_length=15)

    email = models.EmailField()

    address = models.TextField()

    city = models.CharField(max_length=100)

    state = models.CharField(max_length=100)

    pincode = models.CharField(max_length=10)

    blood_group = models.CharField(max_length=5,choices=BLOOD_GROUP_CHOICES)

    available_units = models.PositiveIntegerField(default=0)

    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default="Open")

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["blood_bank_name"]

    def __str__(self):
        return self.blood_bank_name