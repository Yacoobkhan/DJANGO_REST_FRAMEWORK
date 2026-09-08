import requests

endpoint='http://127.0.0.1:8000/api/products/7/update'

data={
    "title":"Hello!!",
    "content":"intern"
}

get_response = requests.put(endpoint, json=data)


print(get_response.json())