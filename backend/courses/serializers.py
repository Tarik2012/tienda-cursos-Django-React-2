from rest_framework import serializers
from .models import CourseCategory, Tag, Course,Review

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        
class CourseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = '__all__'  # Incluye todo + category_name y tags serializados      

class ReviewSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Review
        fields = ["id", "user_email", "rating", "comment", "created_at"]
        read_only_fields = ["id", "user_email", "created_at"]

    def validate(self, data):
        user = self.context["request"].user
        course_id = self.context["view"].kwargs.get("course_id")

        if Review.objects.filter(user=user, course_id=course_id).exists():
            raise serializers.ValidationError("Ya has dejado una reseña para este curso.")
        
        return data
 
