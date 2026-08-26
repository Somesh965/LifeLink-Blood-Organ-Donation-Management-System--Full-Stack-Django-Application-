from django_filters import rest_framework as filters

from .models import Donor

class DonorFilter(filters.FilterSet):

    availability_status =filters.CharFilter(field_name="availability_status",lookup_expr="iexact")

    is_eligible = filters.BooleanFilter(field_name="is_eligible")

    class Meta:
        model = Donor
        fields = [
            "availability_status",
            "is_eligible",
        ]