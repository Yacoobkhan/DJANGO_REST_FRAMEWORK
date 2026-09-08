from rest_framework import generics 
from products.models import Product
from products.serializers import ProductSerializer

class SearchListView(generics.ListAPIView):
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