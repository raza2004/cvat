# Copyright (C) CVAT.ai Corporation
#
# SPDX-License-Identifier: MIT

from rest_framework import routers

from .views import LabelCountsViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register("test/label-counts", LabelCountsViewSet, basename="test_label_counts")

urlpatterns = router.urls
