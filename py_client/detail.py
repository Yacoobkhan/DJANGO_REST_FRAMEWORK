import requests

endpoint='http://127.0.0.1:8000/api/products/10'

get_response = requests.get(endpoint,json={"title":"Abc","content":"This is the abc content","price":"123"})
print(get_response.json())