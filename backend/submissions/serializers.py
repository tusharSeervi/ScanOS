from rest_framework import serializers

from .models import Submission


class SubmissionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = (
            "id",
            "patient_name",
            "age",
            "phone",
            "primary_concern",
            "status",
            "created_at",
        )
        read_only_fields = (
            "id",
            "status",
            "created_at",
        )


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = (
            "id",
            "patient_name",
            "age",
            "phone",
            "primary_concern",
            "status",
            "created_at",
        )


class SubmissionStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ("status",)