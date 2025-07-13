from django.urls import path

from restaurant import views

urlpatterns = [
    path('', views.MenuList.as_view(), name='home'),
    path('item/<int:pk>/', views.MenuDetail.as_view(), name='menu_item')
]