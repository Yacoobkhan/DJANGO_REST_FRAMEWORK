import requests

endpoint = "http://127.0.0.1:8000/api/products/1337"

get_response = requests.get(endpoint)

print("Status Code:", get_response.status_code)
print("Content-Type:", get_response.headers.get("content-type"))
print("Response:")
print(get_response.text)