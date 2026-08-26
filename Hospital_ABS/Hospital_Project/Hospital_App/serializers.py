from django.core.serializers import serialize
from .models import Appointment
from rest_framework import serializers

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Appointment
        fields='__all__'
        read_only_fields=['id','created_at','updated_at']

    def validate_patient_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Patient name cannot be empty.")
        return value