# import requests

# #endpoint="https://httpbin.org/status/200"
# endpoint= "http://127.0.0.1:8000/api/"

# get_response = requests.get(endpoint, params={"abc":123}, json={"query":"Hello,world"})
# print(get_response.json())
# print(get_response.status_code)

import requests

endpoint = "http://127.0.0.1:8000/api/"

response = requests.post(
    endpoint,
    json={"title":"Hello, world","content":"Content is very important","price":"hello"}
)

# print("Response: ", response.text)
# print("Headers: ", response.headers)
print("Request method:", response.request.method)
print("Request URL:", response.request.url)
print("Request body:", response.request.body)

print("Response:", response.json())
# print("Status:", response.status_code)

# import requests

# endpoint = "http://127.0.0.1:8000/api/"

# response = requests.get(
#     endpoint,
#     params={"abc": 123},
#     json={"query": "Hello,world"}
# )

# print("Status Code:", response.status_code)
# print("Response Headers:", response.headers)
# print("Response Text:", response.text)