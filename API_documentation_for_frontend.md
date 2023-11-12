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
