from rest_framework.exceptions import ValidationError
from django.test import TestCase

from .models import Submission
from .services import SubmissionService


class SubmissionServiceTests(TestCase):
    """
    Tests for SubmissionService business rules.
    """

    def setUp(self):
        """
        Create a fresh submission before each test.
        """
        self.submission = Submission.objects.create(
            patient_name="John Doe",
            age=30,
            phone="9876543210",
            primary_concern="Persistent headache",
        )

    def test_new_to_in_review_is_allowed(self):
        """
        NEW -> IN_REVIEW should succeed.
        """
        updated_submission = SubmissionService.update_status(
            self.submission,
            Submission.Status.IN_REVIEW,
        )

        self.assertEqual(
            updated_submission.status,
            Submission.Status.IN_REVIEW,
        )

    def test_new_to_approved_is_not_allowed(self):
        """
        NEW -> APPROVED should raise ValidationError.
        """
        with self.assertRaises(ValidationError):
            SubmissionService.update_status(
                self.submission,
                Submission.Status.APPROVED,
            )

    def test_new_to_rejected_is_not_allowed(self):
        """
        NEW -> REJECTED should raise ValidationError.
        """
        with self.assertRaises(ValidationError):
            SubmissionService.update_status(
                self.submission,
                Submission.Status.REJECTED,
            )

    def test_in_review_to_approved_is_allowed(self):
        """
        IN_REVIEW -> APPROVED should succeed.
        """
        SubmissionService.update_status(
            self.submission,
            Submission.Status.IN_REVIEW,
        )

        updated_submission = SubmissionService.update_status(
            self.submission,
            Submission.Status.APPROVED,
        )

        self.assertEqual(
            updated_submission.status,
            Submission.Status.APPROVED,
        )

    def test_in_review_to_rejected_is_allowed(self):
        """
        IN_REVIEW -> REJECTED should succeed.
        """
        SubmissionService.update_status(
            self.submission,
            Submission.Status.IN_REVIEW,
        )

        updated_submission = SubmissionService.update_status(
            self.submission,
            Submission.Status.REJECTED,
        )

        self.assertEqual(
            updated_submission.status,
            Submission.Status.REJECTED,
        )

    def test_approved_to_new_is_not_allowed(self):
        """
        APPROVED -> NEW should raise ValidationError.
        """
        SubmissionService.update_status(
            self.submission,
            Submission.Status.IN_REVIEW,
        )

        SubmissionService.update_status(
            self.submission,
            Submission.Status.APPROVED,
        )

        with self.assertRaises(ValidationError):
            SubmissionService.update_status(
                self.submission,
                Submission.Status.NEW,
            )