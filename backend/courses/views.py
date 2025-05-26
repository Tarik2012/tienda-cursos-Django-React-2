from rest_framework.generics import ListCreateAPIView,RetrieveAPIView,ListAPIView
from .models import CourseCategory,Tag,Course,Review
from .serializers import CategorySerializer,TagSerializer,CourseSerializer,ReviewSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication


class CategoryListCreateView(ListCreateAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CategorySerializer

class TagListCreateView(ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer    


class CourseListCreateView(ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer   

#Vista detail de los cursos
class CourseDetailView(RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer     

class ReviewListCreateView(ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        course_id = self.kwargs["course_id"]
        return Review.objects.filter(course__id=course_id).order_by("-created_at")

    def perform_create(self, serializer):
        course_id = self.kwargs["course_id"]
        course = Course.objects.get(id=course_id)
        serializer.save(user=self.request.user, course=course)

class CourseSearchView(ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        return Course.objects.filter(title__icontains=query)        


