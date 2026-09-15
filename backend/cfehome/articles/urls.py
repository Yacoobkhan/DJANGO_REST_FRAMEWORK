from django.urls import path


from . import views 

urlpatterns = [
    path('', views.ArticleListView.as_view(), name='article-list'),
    path('<int:pk>/', views.ArticleDetailView.as_view(), name='article-detail'),
    path('create',views.ArticleCreateView.as_view(),name='article-create'),
    path('<int:pk>/update',views.ArticleUpdateView.as_view(),name='article-update'),
    path('<int:pk>/destroy',views.ArticleDestroyView.as_view(),name='article-destroy'),
]