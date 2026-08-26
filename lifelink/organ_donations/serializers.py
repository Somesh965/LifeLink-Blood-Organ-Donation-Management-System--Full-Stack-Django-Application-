from rest_framework import serializers
from .models import OrganDonation


class OrganDonationSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrganDonation
        fields = "__all__"
        read_only_fields = [
            "created_at",
            "updated_at",
        ]