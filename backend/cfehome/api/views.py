from django.shortcuts import render
#from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from products.models import Product
from django.forms.models import model_to_dict
from products.serializers import ProductSerializer

# Create your views here.


@api_view(["GET","POST"])
def api_home(request,*args,**kwargs):
    serializer = ProductSerializer(data = request.data)
    if serializer.is_valid(raise_exception=True):
        instance = serializer.save()
        print(serializer.data)
        return Response(serializer.data)
    return Response({"invalid":"not good data"},status=400)
# @api_view(["GET"])
# def api_home(request,*args,**kwargs):
#     instance = Product.objects.all().order_by("?").first()
#     data = {}

    # if request.method != "POST":
    #     return Response({"detail":"GET NOT ALLOWED"},status=405)
    # if instance:
        # data['title'] = model_data.title
        # data['content'] = model_data.content 
        # data['price'] = model_data.price
        # data = ProductSerializer(instance).data
        #print(data)
        # data = dict(data)
        # json_data_str = json.dumps(data)
    # return Response(data)
    #body = request.body
    # data={}
    # try:
    #     data = json.loads(body)
    # except:
    #     pass
    # # print(request.GET) # url query params
    # data['params'] = dict(request.GET)
    # data['headers'] = (dict(request.headers))
    # data['content_type'] = request.content_type
    # return JsonResponse(data)

# from django.http import JsonResponse
# # from django.views.decorators.csrf import csrf_exempt


# # @csrf_exempt
# def api_home(request, *args, **kwargs):

#     # print("==============================")
#     # print("METHOD:", request.method)
#     # print("BODY:", request.body)
#     # print("GET:", request.GET)
#     # print("==============================")
#     body = request.body
#     print(body)
#     return JsonResponse({
#         "message": "Hi there, this is your Django API Response!!!"
#     })

