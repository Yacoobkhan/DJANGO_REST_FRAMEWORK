import requests
from getpass import getpass

endpoint_auth = 'http://localhost:8000/api/auth/'
username = input("Enter the username? \n")
password = getpass("Enter your password: \n")

get_auth_response = requests.post(
    endpoint_auth,
    json={
        'username': username,
        'password': password
    }
)

print(get_auth_response.json())

if get_auth_response.status_code == 200:
    token = get_auth_response.json()['token']
    headers = {
        "Authorization": f"Bearer {token}"
    }
    endpoint="http://localhost:8000/api/products/"
    get_response = requests.get(endpoint,headers=headers)
    data = get_response.json()
    next_url = data['next']
    results = data['results']
    # print(next_url)
    print(results)

# print("Status Code:", get_auth_response.status_code)
# print("Content-Type:", get_auth_response.headers.get('Content-Type'))
# print("Response:", get_auth_response.text)
# endpoint='http://127.0.0.1:8000/api/products'

# get_response = requests.get(endpoint)
# print(get_response.json())
