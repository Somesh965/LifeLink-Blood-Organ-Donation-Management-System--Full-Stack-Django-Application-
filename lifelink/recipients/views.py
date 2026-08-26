from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions, filters

from .models import Recipient
from .serializers import RecipientSerializer
from .filters import RecipientFilter
from .pagination import RecipientPagination
from .permissions import IsOwnerOrAdmin


class RecipientCreateAPIView(generics.CreateAPIView):
    serializer_class = RecipientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RecipientListAPIView(generics.ListAPIView):
    queryset = Recipient.objects.all()
    serializer_class = RecipientSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_class = RecipientFilter

    search_fields = [
        "user__username",
        "hospital_name",
    ]

    ordering_fields = [
        "created_at",
    ]

    pagination_class = RecipientPagination


class RecipientDetailAPIView(generics.RetrieveAPIView):
    queryset = Recipient.objects.all()
    serializer_class = RecipientSerializer
    permission_classes = [permissions.IsAuthenticated]


class RecipientUpdateAPIView(generics.UpdateAPIView):
    queryset = Recipient.objects.all()
    serializer_class = RecipientSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrAdmin,
    ]


class RecipientDeleteAPIView(generics.DestroyAPIView):
    queryset = Recipient.objects.all()
    serializer_class = RecipientSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrAdmin,
    ]

