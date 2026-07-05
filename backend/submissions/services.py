from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from .models import Submission


class SubmissionService:
    """
    Contains all business logic related to Submission.
    Views should call this service instead of directly using the ORM.
    """
    # Allowed status transitions for the submission workflow.
    ALLOWED_TRANSITIONS = {                          
    Submission.Status.NEW: {
        Submission.Status.IN_REVIEW,
    },
    Submission.Status.IN_REVIEW: {
        Submission.Status.APPROVED,
        Submission.Status.REJECTED,
    },
    Submission.Status.APPROVED: set(),
    Submission.Status.REJECTED: set(),
    }
    #decorator that marks the method as a static method, meaning it can be called on the class itself without needing an instance of the class
    @staticmethod                    
    @transaction.atomic
    #imediately followed by the method (Good practice to use static methods for service classes that don't need to maintain state)
    def create_submission(serializer):     
        """
        Create a new submission.
        """
        return serializer.save()

    @staticmethod
    def get_submission(submission_id):
        """
        Return a single submission or raise 404.
        """
        return get_object_or_404(Submission, pk=submission_id)

    @staticmethod
    def list_submissions():
        """
        Return all submissions.
        """
        return Submission.objects.all()

    @staticmethod
    @transaction.atomic
    
    def update_status(submission, new_status):
        """
        Update submission status if the transition is allowed.
        """
        allowed = SubmissionService.ALLOWED_TRANSITIONS.get(
        submission.status,
        set(),
    )

        if new_status not in allowed:
            raise ValidationError(
            {
                "status": (
                    f"Cannot change status from "
                    f"'{submission.status}' to '{new_status}'."
                )
            }
        )

        submission.status = new_status
        submission.save(update_fields=["status"])

        return submission