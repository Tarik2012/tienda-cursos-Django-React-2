from django.urls import path
from .views import (
    CategoryListCreateView,
    TagListCreateView,
    CourseListCreateView,
    CourseDetailView,
    ReviewListCreateView,
    CourseSearchView
)

urlpatterns = [
    path('categories/', CategoryListCreateView.as_view(), name='course-categories'),
    path('tags/', TagListCreateView.as_view(), name='course-tags'),
    path('courses/', CourseListCreateView.as_view(), name='course-list-create'),
    path('courses/<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
    path("courses/<int:course_id>/reviews/", ReviewListCreateView.as_view(), name="course-reviews"),
    path("courses/search/", CourseSearchView.as_view(), name="course-search"),
]
