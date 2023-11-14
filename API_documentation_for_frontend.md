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

### Log in

To log in the user, make a POST request to the consumer API endpoint "/auth/login"
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
    "user_email": "string",
    "password": "string",
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

## Driver application

### Sign up

To sign up the driver, make a POST request to the driver API endpoint "/auth/signup"
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
    "driver_name": "string",
    "driver_email": "string",
    "password": "string",
    "driver_location": "string",
    "signup_key": "<key defined in .env file>"
}
```

In respose from this endpoint you will get:

If response is successfull:

1. Access toekn cookie is set for a driver
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

### Log in

To log in the driver, make a POST request to the driver API endpoint "/auth/login"
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
    "driver_email": "string",
    "password": "string",
}
```

In respose from this endpoint you will get:

If response is successfull:

1. Access toekn cookie is set for a driver
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

### Consumer application load function

To load the user into the application make a GET request to "/me" route
NOTE: need to have "credentials": "include" in the request, but i dont know if it has to be set in request headers. This is needed to pass the access_token cookie to the API

Response object:

```
{
 "status": "success",
 "data": {
  "username": "<username>",
  "notifications": [
    {
      "title": "<notification_title>",
      "parcel_id": "<parcel_id>",
      "status": "<parcel_status>"
    },...
  ]
 }
}
```

### User active parcels

To load user active parcels make a GET request to "/me/parcels" route
NOTE: need to have "credentials": "include" in the request, but i dont know if it has to be set in request headers. This is needed to pass the access_token cookie to the API

Response object:

```
{
 "status": "success",
 "data": {
  "user_parcels": [
    {
      "last_status_date": "13.11.23",
      "parcel_id": "f9a64037-2e16-40ec-95ec-10f64a1886d7",
      "parcel_status": "prepared for delivery"
    }
  ]
 }
}
```
