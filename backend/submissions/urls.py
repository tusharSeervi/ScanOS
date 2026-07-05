from django.urls import path

from .views import (
    SubmissionDetailView,
    SubmissionListCreateView,
    SubmissionStatusUpdateView,
)

urlpatterns = [
    path(
        "",
        SubmissionListCreateView.as_view(),
        name="submission-list-create",
    ),
    path(
        "<int:pk>/",
        SubmissionDetailView.as_view(),
        name="submission-detail",
    ),
    path(
        "<int:pk>/status/",
        SubmissionStatusUpdateView.as_view(),
        name="submission-status-update",
    ),
]