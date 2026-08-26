from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from accounts.models import User
from donors.models import Donor
from recipients.models import Recipient
from blood_requests.models import BloodRequest
from blood_banks.models import BloodBank
from hospitals.models import Hospital
from donations.models import Donation
from organ_donations.models import OrganDonation


class DashboardAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        data = {

            "total_users": User.objects.count(),

            "total_donors": Donor.objects.count(),

            "total_recipients": Recipient.objects.count(),

            "total_blood_requests": BloodRequest.objects.count(),

            "total_blood_banks": BloodBank.objects.count(),

            "total_hospitals": Hospital.objects.count(),

            "total_donations": Donation.objects.count(),

            "total_organ_donations": OrganDonation.objects.count(),

        }

        return Response(data)
