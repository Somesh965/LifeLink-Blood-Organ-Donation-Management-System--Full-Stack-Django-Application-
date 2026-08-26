from django import forms
from .models import Appointment

class AppointmentForm(forms.ModelForm):
    class Meta:
        model = Appointment
        fields = [
            'patient_name',
            'patient_email',
            'doctor_name',
            'department',
            'appointment_date',
            'appointment_time',
            'symptoms',
            'status',
        ]
        # widgets = {
        #     'patient_name': forms.TextInput(attrs={
        #         'class': 'form-control',
        #         'placeholder': 'Enter patient full name'
        #     }),
        #     'patient_email': forms.EmailInput(attrs={
        #         'class': 'form-control',
        #         'placeholder': 'patient@example.com'
        #     }),
        #     'doctor_name': forms.TextInput(attrs={
        #         'class': 'form-control',
        #         'placeholder': 'Enter doctor name'
        #     }),
        #     'department': forms.Select(attrs={
        #         'class': 'form-control',
        #     }),
        #     'appointment_date': forms.DateInput(attrs={
        #         'class': 'form-control',
        #         'type': 'date',
        #     }),
        #     'appointment_time': forms.TimeInput(attrs={
        #         'class': 'form-control',
        #         'type': 'time',
        #     }),
        #     'symptoms': forms.Textarea(attrs={
        #         'class': 'form-control',
        #         'rows': 4,
        #         'placeholder': 'Describe symptoms or reason for visit'
        #     }),
        #     'status': forms.Select(attrs={
        #         'class': 'form-control',
        #     }),
        # }

    def clean_patient_name(self):
        name = self.cleaned_data.get('patient_name', '').strip()
        if not name:
            raise forms.ValidationError("Patient name cannot be empty.")
        return name