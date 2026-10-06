# Copyright (C) CVAT.ai Corporation
#
# SPDX-License-Identifier: MIT

from collections import Counter

from django.db.models import Count
from rest_framework import mixins, viewsets
from rest_framework.response import Response

from cvat.apps.engine.models import LabeledImage, LabeledShape, LabeledTrack, Task
from cvat.apps.engine.permissions import TaskPermission


class LabelCountsViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Task.objects.all()
    filter_backends = []
    iam_permission_class = TaskPermission
    iam_supports_organization_params = True

    def retrieve(self, request, *args, **kwargs):
        task = self.get_object()

        counts = Counter()
        for model in (LabeledShape, LabeledTrack, LabeledImage):
            rows = (
                model.objects.filter(job__segment__task=task)
                .values_list("label_id")
                .annotate(count=Count("id"))
            )
            counts.update(dict(rows))

        return Response(
            [{"id": l.id, "name": l.name, "count": counts[l.id]} for l in task.get_labels()]
        )
