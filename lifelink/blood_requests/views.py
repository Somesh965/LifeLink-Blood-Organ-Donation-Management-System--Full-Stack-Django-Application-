from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions, filters

from .models import BloodRequest
from .serializers import BloodRequestSerializer
from .filters import BloodRequestFilter
from .pagination import BloodRequestPagination
from .permissions import IsOwnerOrAdmin
from recipients.models import Recipient


class BloodRequestCreateAPIView(generics.CreateAPIView):

    serializer_class = BloodRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        recipient = Recipient.objects.get(user=self.request.user)
        serializer.save(recipient=recipient)


class BloodRequestListAPIView(generics.ListAPIView):

    queryset = BloodRequest.objects.all()
    serializer_class = BloodRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_class = BloodRequestFilter

    search_fields = [
        "patient_name",
        "hospital_name",
        "city",
    ]

    ordering_fields = [
        "created_at",
        "required_date",
    ]

    pagination_class = BloodRequestPagination


class BloodRequestDetailAPIView(generics.RetrieveAPIView):

    queryset = BloodRequest.objects.all()
    serializer_class = BloodRequestSerializer
    permission_classes = [permissions.IsAuthenticated]


class BloodRequestUpdateAPIView(generics.UpdateAPIView):

    queryset = BloodRequest.objects.all()
    serializer_class = BloodRequestSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrAdmin,
    ]


class BloodRequestDeleteAPIView(generics.DestroyAPIView):

    queryset = BloodRequest.objects.all()
    serializer_class = BloodRequestSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrAdmin,
    ]
