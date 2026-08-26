from django_filters import rest_framework as filters
from .models import Recipient


class RecipientFilter(filters.FilterSet):

    required_blood_group = filters.CharFilter(field_name="required_blood_group",lookup_expr="iexact")

    city = filters.CharFilter(field_name="city",lookup_expr="icontains")

    class Meta:
        model = Recipient
        fields = [
            "required_blood_group",
            "city",
        ]