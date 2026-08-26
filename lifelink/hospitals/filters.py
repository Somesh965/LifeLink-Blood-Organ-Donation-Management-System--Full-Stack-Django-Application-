import django_filters
from .models import Hospital


class HospitalFilter(django_filters.FilterSet):

    city = django_filters.CharFilter(field_name="city",lookup_expr="icontains")

    state = django_filters.CharFilter(field_name="state",lookup_expr="icontains")

    status = django_filters.CharFilter(field_name="status",lookup_expr="iexact")

    class Meta:
        model = Hospital
        fields = [
            "city",
            "state",
            "status",
        ]