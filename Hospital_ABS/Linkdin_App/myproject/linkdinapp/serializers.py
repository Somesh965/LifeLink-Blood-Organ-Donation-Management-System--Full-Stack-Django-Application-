from rest_framework import serializers

from linkedapp.models import StudentsModel


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentsModel
        fields = '__all__'