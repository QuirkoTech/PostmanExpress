# How to use application APIs in frontend

## Consumer application

### Sign up

To sign up the user, make a POST request to the consumer API endpoint "/auth/signup"
Requiremets:

Request headers:

```
{
  "Content-type": "application/json"
}
```

Request body:

```
{
    "username": "string",
    "user_email": "string",
    "password": "string",
    "password_confirm": "string",
    "location": "string"
}
```

In respose from this endpoint you will get:

If response is successfull:

1. Access toekn cookie is set for a user
2. Object like this:

```
{
  "status": "success"
}
```

If response failed:

1. Object like this:

```
{
  "status": "<fail or error>",
  "message": "<response message>"
}
```
