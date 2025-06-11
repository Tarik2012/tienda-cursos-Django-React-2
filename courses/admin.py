from django.contrib import admin
from .models import CourseCategory, Tag, Course, Review

admin.site.register(CourseCategory)
admin.site.register(Tag)
admin.site.register(Course)
admin.site.register(Review)
