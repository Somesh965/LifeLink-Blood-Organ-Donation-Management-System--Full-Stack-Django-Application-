from django.db import models
from django.db.models import CharField
from django.urls import reverse

# Create your models here.
class Appointment(models.Model):
    Department_choice=[
        ('Cardiology', 'Cardiology'),
        ('Dermatology', 'Dermatology'),
        ('Orthopedics', 'Orthopedics'),
        ('General Medicine', 'General Medicine'),
        ('ENT', 'ENT'),
    ]
    Status_Choice = [
        ('Booked', 'Booked'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]

    patient_name=models.CharField(max_length=100)
    patient_email=models.EmailField()
    doctor_name=models.CharField(max_length=100)
    department=models.CharField(max_length=100,choices=Department_choice)
    appointment_date=models.DateField()
    appointment_time=models.TimeField()
    symptoms=models.TextField()
    status=models.CharField(max_length=100,choices=Status_Choice)
    created_at=models.DateField(auto_now_add=True)
    updated_at=models.DateField(auto_now=True)

    class Meta:
        ordering = ['-appointment_date', '-appointment_time']
        verbose_name = "Appointment"
        verbose_name_plural = "Appointments"

    def __str__(self):
        return f"{self.patient_name} with Dr. {self.doctor_name} on {self.appointment_date}"

    def get_absolute_url(self):
        return reverse('appointment-detail', kwargs={'pk': self.pk})

    @property
    def status_badge_class(self):
        mapping = {
            'Booked': 'status-booked',
            'Completed': 'status-completed',
            'Cancelled': 'status-cancelled',
        }
        return mapping.get(self.status, 'status-booked')

