import django_filters
from .models import Donation


class DonationFilter(django_filters.FilterSet):

    blood_group = django_filters.CharFilter(field_name="blood_group",lookup_expr="iexact")

    donation_status = django_filters.CharFilter(field_name="donation_status",lookup_expr="iexact")

    donation_date = django_filters.DateFilter(field_name="donation_date")

    class Meta:
        model = Donation
        fields = [
            "blood_group",
            "donation_status",
            "donation_date",
        ]