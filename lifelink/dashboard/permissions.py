from rest_framework.permissions import IsAuthenticated


class DashboardPermission(IsAuthenticated):
    pass