import django_filters
from .models import BloodRequest

class BloodRequestFilter(django_filters.FilterSet):

    blood_group = django_filters.CharFilter(field_name="blood_group",lookup_expr="iexact")

    status = django_filters.CharFilter(field_name="status",lookup_expr="iexact")

    urgency = django_filters.CharFilter(field_name="urgency",lookup_expr="iexact")

    city = django_filters.CharFilter(field_name="city",lookup_expr="icontains")

    class Meta:
        model = BloodRequest
        fields = [
            "blood_group",
            "status",
            "urgency",
            "city",
        ]