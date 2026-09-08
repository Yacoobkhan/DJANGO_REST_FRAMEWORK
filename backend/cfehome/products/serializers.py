from rest_framework import serializers
from rest_framework.reverse import reverse
from .models import Product
from rest_framework import serializers
# from .validators import validate_title
from . import validators
from api.serializers import UserPublicSerializer

class ProductSerializer(serializers.ModelSerializer):
    owner = UserPublicSerializer(source='user', read_only=True)
    my_user_data = serializers.SerializerMethodField(read_only=True)
    my_discount = serializers.SerializerMethodField(read_only=True)
    edit_url = serializers.SerializerMethodField(read_only=True)
    url = serializers.HyperlinkedIdentityField(view_name='product_detail', lookup_field = 'pk')
    title = serializers.CharField(validators=[validators.validate_title_no_hello, validators.unique_product_title])
    # email = serializers.EmailField(write_only=True)

    # def create(self, validated_data):
    #     #return Product.objects.all(**validated_data)
    #     # email = validated_data.pop('email')
    #     obj = super().create(validated_data)
    #     # print(email,obj)
    #     return obj

    # def  update(self,instance, validated_data):
    #     instance.title = validated_data.get('title')
    #     return instance
    #     # email = validated_data.pop('email')
    #     # return super().update(instance, validated_data)

    def get_my_user_data(self, obj):
        return{
            "username": obj.user.username
        }

    def get_edit_url(self,obj):
        # return f"/api/products/{obj.id}"
        request = self.context.get('request')
        if request is None:
            return None
        return reverse("product_edit", kwargs={"pk":obj.pk}, request = request)
    class Meta:
        model = Product
        fields=[
            'owner',
            # 'user',
            'url',
            'edit_url',
            'pk',
            'title',
            'content',
            'price',
            'sale_price',
            'my_discount',
            'my_user_data',
        ]

    # def validate_title(self,value):
    #     qs = Product.objects.filter(title__iexact=value)
    #     if qs.exists():
    #         raise serializers.ValidationError(f"{value} is already a product name.")
    #     return value

    
    
    def get_my_discount(self,obj):
        if not hasattr(obj,'id'):
            return None
        if not isinstance(obj,Product):
            return None
        return obj.get_discount()

# class ProductSerializer(serializers.ModelSerializer):
#     get_discount = serializers.SerializerMethodField(read_only=True)
#     class Meta:
#         model = Product
#         fields=['title','content','price','sale_price','get_discount']

#     def get_my_discount(self,obj):
#         #print(obj.id)
#         return obj.get_discount()