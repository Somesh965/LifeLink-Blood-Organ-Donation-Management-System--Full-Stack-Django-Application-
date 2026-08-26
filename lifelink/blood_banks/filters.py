import django_filters
from .models import BloodBank


class BloodBankFilter(django_filters.FilterSet):

    blood_group = django_filters.CharFilter(field_name="blood_group",lookup_expr="iexact")

    city = django_filters.CharFilter(field_name="city",lookup_expr="icontains")

    status = django_filters.CharFilter(field_name="status",lookup_expr="iexact")

    class Meta:
        model = BloodBank
        fields = [
            "blood_group",
            "city",
            "status",
        ]