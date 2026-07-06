from django.core.management.base import BaseCommand

from submissions.models import Submission


class Command(BaseCommand):
    help = "Seed the database with example submissions."

    SAMPLE_SUBMISSIONS = [
    {
        "patient_name": "Alice Johnson",
        "age": 29,
        "phone": "9876543210",
        "primary_concern": "Persistent headache",
        "status": Submission.Status.NEW,
    },
    {
        "patient_name": "Robert Smith",
        "age": 45,
        "phone": "9123456780",
        "primary_concern": "Lower back pain",
        "status": Submission.Status.NEW,
    },
    {
        "patient_name": "Emily Davis",
        "age": 34,
        "phone": "9988776655",
        "primary_concern": "Knee swelling",
        "status": Submission.Status.NEW,
    },
    {
        "patient_name": "Michael Brown",
        "age": 51,
        "phone": "9876501234",
        "primary_concern": "Chest discomfort",
        "status": Submission.Status.NEW,
    },
    {
        "patient_name": "Sophia Wilson",
        "age": 27,
        "phone": "9871112233",
        "primary_concern": "Migraine",
        "status": Submission.Status.NEW,
    },
    {
        "patient_name": "Daniel Miller",
        "age": 39,
        "phone": "9988112233",
        "primary_concern": "Shoulder pain",
        "status": Submission.Status.NEW,
    },
    {
        "patient_name": "Olivia Moore",
        "age": 22,
        "phone": "9000011111",
        "primary_concern": "Sports injury",
        "status": Submission.Status.IN_REVIEW,
    },
    {
        "patient_name": "James Taylor",
        "age": 48,
        "phone": "9555512345",
        "primary_concern": "Neck stiffness",
        "status": Submission.Status.IN_REVIEW,
    },
    {
        "patient_name": "Emma Anderson",
        "age": 31,
        "phone": "9666612345",
        "primary_concern": "Hip pain",
        "status": Submission.Status.IN_REVIEW,
    },
    {
        "patient_name": "William Thomas",
        "age": 56,
        "phone": "9777712345",
        "primary_concern": "Chronic knee pain",
        "status": Submission.Status.IN_REVIEW,
    },
    {
        "patient_name": "Ava Jackson",
        "age": 24,
        "phone": "9888812345",
        "primary_concern": "Foot fracture",
        "status": Submission.Status.APPROVED,
    },
    {
        "patient_name": "Benjamin White",
        "age": 41,
        "phone": "9111122222",
        "primary_concern": "Arm numbness",
        "status": Submission.Status.APPROVED,
    },
    {
        "patient_name": "Charlotte Harris",
        "age": 37,
        "phone": "9222233333",
        "primary_concern": "Severe back pain",
        "status": Submission.Status.APPROVED,
    },
    {
        "patient_name": "Lucas Martin",
        "age": 44,
        "phone": "9333344444",
        "primary_concern": "Ankle injury",
        "status": Submission.Status.REJECTED,
    },
    {
        "patient_name": "Mia Thompson",
        "age": 33,
        "phone": "9444455555",
        "primary_concern": "Recurring dizziness",
        "status": Submission.Status.REJECTED,
    },
]

    def handle(self, *args, **options):
        existing_count = Submission.objects.count()

        if existing_count >= len(self.SAMPLE_SUBMISSIONS):
            self.stdout.write(
                self.style.WARNING(
                    "Database already contains enough submissions. Seed skipped."
                )
            )
            return

        submissions_to_create = self.SAMPLE_SUBMISSIONS[existing_count:]

        Submission.objects.bulk_create(
            [
                Submission(**submission)
                for submission in submissions_to_create
            ]
        )

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully created {len(submissions_to_create)} submissions."
            )
        )