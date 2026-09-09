from rest_framework import generics 
from products.models import Product
from products.serializers import ProductSerializer
from rest_framework.response import Response

from . import client

class SearchListView(generics.GenericAPIView):
    def get(self,request,*args,**kwargs):
        user = None
        if request.user.is_authenticated:
            user = request.user.username
        query = request.GET.get('q')
        public = str(request.GET.get('public')) != '0'
        tag = request.GET.get('tag')
        print(query,public,tag,user)
        if not query:
            return Response('',status=400)
        results = client.perform_index(query, tags=tag, user=user, public=public)
        return Response(results)

class SearchArticleListView(generics.GenericAPIView):
    def get(self,request,*args,**kwargs):
        # user = None
        # if request.user.is_authenticated:
        #     user = request.user.username
        query = request.GET.get('q')
        # public = str(request.GET.get('public')) != '0'
        tag = request.GET.get('tag')
        # print(query,public,tag,user)
        if not query:
            return Response('',status=400)
        results = client.perform_article(query, tags=tag) # ,user=user,public=public
        return Response(results)

class SearchListOldView(generics.ListAPIView):
    queryset = Product.objects.all()   #product objects
    serializer_class = ProductSerializer #when you get product objects, using Product serializer convert them into API data

    def get_queryset(self,*args,**kwargs):
        qs = super().get_queryset(*args,**kwargs) #call queryset() from parent class
        q = self.request.GET.get('q') #read the value from url ?q=laptop
        results = Product.objects.none()
        if q is not None:
            user = None
            if self.request.user.is_authenticated: #checking whether user iis logged in or not
                user = self.request.user #get current user
            results = qs.search(q,user=user) #move view into Queryset
        return results