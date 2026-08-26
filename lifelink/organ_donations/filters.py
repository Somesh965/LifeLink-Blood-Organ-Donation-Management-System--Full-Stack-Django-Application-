import django_filters
from .models import OrganDonation


class OrganDonationFilter(django_filters.FilterSet):

    organ_name = django_filters.CharFilter(
        field_name="organ_name",
        lookup_expr="iexact"
    )

    status = django_filters.CharFilter(
        field_name="status",
        lookup_expr="iexact"
    )

    donation_date = django_filters.DateFilter(
        field_name="donation_date"
    )

    class Meta:
        model = OrganDonation
        fields = [
            "organ_name",
            "status",
            "donation_date",
        ]