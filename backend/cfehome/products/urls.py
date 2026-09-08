from django.urls import path 
from . import views

urlpatterns=[
    path('create',views.product_create_view,name="product_create"),
    path('', views.product_list_create_view, name='product-list'),
    path('<int:pk>',views.ProductDetailAPIView.as_view(),name='product_detail'),
    path('<int:pk>/update',views.product_update_view,name='product_edit'), #product_update
    path('<int:pk>/destroy',views.product_destroy_view,name='product_destroy'),
]