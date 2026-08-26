from rest_framework import serializers


class DashboardSerializer(serializers.Serializer):

    total_users = serializers.IntegerField()
    total_donors = serializers.IntegerField()
    total_recipients = serializers.IntegerField()
    total_blood_requests = serializers.IntegerField()
    total_blood_banks = serializers.IntegerField()
    total_hospitals = serializers.IntegerField()
    total_donations = serializers.IntegerField()
    total_organ_donations = serializers.IntegerField()