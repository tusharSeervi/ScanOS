import django_filters

from .models import Submission


class SubmissionFilter(django_filters.FilterSet):
    class Meta:
        model = Submission
        fields = {
            "status": ["exact"],
            "age": ["gte", "lte"],
            "created_at": ["date"],
        }