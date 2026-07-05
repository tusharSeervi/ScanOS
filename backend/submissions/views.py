from rest_framework import generics
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .filters import SubmissionFilter

from .models import Submission
from .serializers import (
    SubmissionCreateSerializer,
    SubmissionSerializer,
    SubmissionStatusUpdateSerializer,
)
from .services import SubmissionService


class SubmissionListCreateView(generics.ListCreateAPIView):
    """
    GET  -> List all submissions
    POST -> Create a submission
    """
    filter_backends = [
    DjangoFilterBackend,
    OrderingFilter,
    ]
    filterset_class = SubmissionFilter

    ordering_fields = [
    "created_at",
    "age",
    ]

    ordering = [
    "-created_at",
    ]

    queryset = Submission.objects.all()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return SubmissionCreateSerializer
        return SubmissionSerializer

    def get_queryset(self):
        return SubmissionService.list_submissions()

    def perform_create(self, serializer):
        SubmissionService.create_submission(serializer)


class SubmissionDetailView(generics.RetrieveAPIView):
    """
    GET /submissions/<id>/
    """

    serializer_class = SubmissionSerializer

    def get_object(self):
        return SubmissionService.get_submission(
            self.kwargs["pk"]
        )


class SubmissionStatusUpdateView(generics.UpdateAPIView):
    """
    PATCH /submissions/<id>/status/
    """

    serializer_class = SubmissionStatusUpdateSerializer

    def get_object(self):
        return SubmissionService.get_submission(
            self.kwargs["pk"]
        )

    def update(self, request, *args, **kwargs):
        submission = self.get_object()

        serializer = self.get_serializer(
            submission,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)

        
        SubmissionService.update_status(
            submission,
            serializer.validated_data["status"],
        )

        return Response(
            SubmissionSerializer(submission).data
        )