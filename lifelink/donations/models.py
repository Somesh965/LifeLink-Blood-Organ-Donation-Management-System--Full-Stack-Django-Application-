from django.db import models
from donors.models import Donor
from recipients.models import Recipient
from blood_requests.models import BloodRequest
from hospitals.models import Hospital


class Donation(models.Model):

    STATUS_CHOICES = [
        ("Scheduled", "Scheduled"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    ]

    donor = models.ForeignKey(Donor,on_delete=models.CASCADE,related_name="donations")

    recipient = models.ForeignKey(Recipient,on_delete=models.CASCADE,related_name="received_donations")

    blood_request = models.ForeignKey(BloodRequest,on_delete=models.CASCADE,related_name="donations")

    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE,related_name="donations")

    blood_group = models.CharField(max_length=5)

    units_donated = models.PositiveIntegerField()

    donation_date = models.DateField()

    donation_status = models.CharField(max_length=20,choices=STATUS_CHOICES, default="Scheduled")

    remarks = models.TextField(blank=True,null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-donation_date"]

    def __str__(self):
        return f"{self.donor.user.username} → {self.recipient.user.username}"