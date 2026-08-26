from rest_framework import serializers
from .models import Recipient


class RecipientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipient
        fields = "__all__"
        read_only_fields = ["user"]