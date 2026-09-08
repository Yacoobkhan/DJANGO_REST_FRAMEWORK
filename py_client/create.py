import requests

headers = {
     "Authorization":"Bearer 58be97d874ced209687cebe076651ebd0b8908b"
}
endpoint="http://127.0.0.1:8000/api/products/create"

data={
    "title":"Learning Token Authentication",
    "price":55.00
}
get_response = requests.post(endpoint,json=data,headers=headers)
print(get_response.text)