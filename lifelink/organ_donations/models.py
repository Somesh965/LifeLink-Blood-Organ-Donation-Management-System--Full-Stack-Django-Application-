from django.db import models
from donors.models import Donor
from recipients.models import Recipient
from hospitals.models import Hospital


class OrganDonation(models.Model):

    ORGAN_CHOICES = [
        ("Kidney", "Kidney"),
        ("Liver", "Liver"),
        ("Heart", "Heart"),
        ("Lungs", "Lungs"),
        ("Pancreas", "Pancreas"),
        ("Cornea", "Cornea"),
        ("Bone Marrow", "Bone Marrow"),
    ]

    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Approved", "Approved"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    ]

    donor = models.ForeignKey(Donor,on_delete=models.CASCADE,related_name="organ_donations")

    recipient = models.ForeignKey(Recipient,on_delete=models.CASCADE,related_name="received_organs")

    hospital = models.ForeignKey(Hospital,on_delete=models.CASCADE,related_name="organ_donations")

    organ_name = models.CharField(max_length=50,choices=ORGAN_CHOICES)

    donation_date = models.DateField()

    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default="Pending")

    remarks = models.TextField(blank=True,null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-donation_date"]

    def __str__(self):
        return f"{self.organ_name} - {self.donor.user.username}"