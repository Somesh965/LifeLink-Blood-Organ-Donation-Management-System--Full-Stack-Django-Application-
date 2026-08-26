from django.db import models

from recipients.models import Recipient
# Create your models here.

class BloodRequest(models.Model):

    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Approved", "Approved"),
        ("Rejected", "Rejected"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    ]

    URGENCY_CHOICES = [
        ("Low", "Low"),
        ("Medium", "Medium"),
        ("High", "High"),
        ("Critical", "Critical"),
    ]

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

    recipient = models.ForeignKey(Recipient,on_delete=models.CASCADE,related_name="blood_requests")

    patient_name = models.CharField(max_length=100)
    patient_age = models.PositiveIntegerField()

    blood_group = models.CharField(max_length=5,choices=BLOOD_GROUP_CHOICES)

    units_required = models.PositiveIntegerField()

    hospital_name = models.CharField(max_length=200)
    hospital_address = models.TextField()

    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)

    reason = models.TextField()

    urgency = models.CharField(max_length=20,choices=URGENCY_CHOICES,default="Medium")

    required_date = models.DateField()

    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.patient_name} - {self.blood_group}"