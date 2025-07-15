from django.contrib import admin
from django.urls import path
from store import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('book/<int:book_id>/', views.book_detail, name='book_detail'),
    path('category/<int:category_id>/', views.category_detail, name='category_detail'),
    path('search/', views.search, name='search'),  # ✅ make sure this line exists
]