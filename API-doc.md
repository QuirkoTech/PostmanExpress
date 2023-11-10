# Navigation:

-   [Helper functions](#api-helper-functions)

    -   [Protect in Application APIs](#protect-function-in-any-application-api)
    -   [Protect in Organization API](#protect-function-in-organization-api)
    -   [Sign tokens](#sign-tokens)

-   [Consumer Application API](#consumer-application-api)

    -   [Signup endpoint](#post-signup--sign-up-the-user)
    -   [Login endpoint](#post-login--log-in-the-user)
    -   [Consumer application load function](#get-me--consumer-application-load-function)

-   [Driver Application API](#driver-application-api)

    -   [Login endpoint](#post-login--log-in-the-driver)
    -   [Driver application load function](#get-me--driver-application-load-function)

-   [Locker application API](#locker-application-api)

    -   [Enter cabinet pin](#post-pin--enter-pin-for-a-cabinet)

-   [Organization API](#organization-api)
    -   [Consumer signup endpoint](#post-consumersignup--sign-up-the-user)
    -   [Consumer login endpoint](#post-consumerlogin--log-in-the-user)
    -   [Cabinet delivery pin entry](#post-cabinetdelivery--try-to-deliver-a-parcel)
    -   [Cabinet pick up pin entry](#post-cabinetpickup--try-to-pick-up-a-parcel)
    -   [Any application load function](#get-me--applications-load-function)

## Things worth to mention:

### Authorization header:

This type of header passes to the [Organization API](#organization-api) protected routes, header looks like this:

```
"Authorization": "Bearer access_token_value"
```

## API helper functions:

### Protect function in any application API

1. It is a middleware function used to protect API endpoints from unauthorized access
2. Function checks access_token cookie existence in the request

### Protect function in Organization API

1. It is a middleware function used to protect API endpoints from unauthorized access
2. Function checks [Authorization header](#authorization-header) existence
3. Function decodes access_token
4. Function checks user existence from access_token payload
5. Function verifies refresh_token from DB
6. Function passes access_token payload in "req.user" object

### Sign tokens

1. Function accepts two parameters: user_type (consumer or driver), id (consumer_id or driver_id)
2. Function signs access_token and refresh_token, both with payload:

```
{
  "user_type": "driver",
  "id": "<driver_id>"
}
```

3. Function returns access_token and refresh_token

## Consumer application API:

### POST /signup => Sign up the user

Request body:

```
{
  "username": "John Doe",
  "password": "98787r623",
  "password_confirm": "98787r623",
  "user_email": "hello@email.com",
  "location": "helsinki"
}
```

Response object:

```
{
 "status": "success"
}
```

1. Function compares password and password_confirm
 <!-- 2. Function sets "user_type" to consumer (set in env) -->
2. Function calls Organization API endpoint [/consumer/signup](#post-consumersignup--sign-up-the-user)
3. Function checks if Organization API response successful
4. Function sets access_token cookie to a user

### POST /login => Log in the user

Request body:

```
{
 "user_email": "example@email.com",
 "password": "hello1234"
}

```

Response object:

```
{
 "status": "success"
}
```

1. Function calls Organization API endpoint [/consumer/login](#post-consumerlogin--log-in-the-user)
2. Function checks if Organization API response successful
3. Function sets access_token cookie to a user

### GET /me => Consumer application load function

Response object:

```
{
 "status": "success",
 "username": "<username>",
 "notifications": [
   {
     "parcel_id": "<parcel_id>",
     "title": "<notification_title>",
     "status": "<parcel_status>"
   },...
 ]
}
```

1. This route is [protected](#protect-function-in-any-application-api)
2. Function passes the access_token from a cookie to a request [Authorization header](#authorization-header) for calling [/me]() route in Organization API
3. Function checks if Organization API response successful
4. Function responds with the response of Organization API response

## Driver application API:

### POST /login => Log in the driver

Request body:

```
{
  "driver_email": "example@email.com",
  "password": "hello1234"
}
```

Response object:

```
{
  "status": "success"
}
```

1. Function checks for driver existence
2. Function compares hashed passwords from a DB and from driver input
3. Function [signs](#sign-tokens) access_token and refresh_token
4. Function updates user refresh_token in DB
5. Function sets access_token cookie to a driver

### GET /me => Driver application load function

Response object:

```
{
 "status": "success",
 "username": "<username>"
}
```

1. This route is [protected](#protect-function-in-any-application-api)
2. Function passes the access_token from a cookie to a request [Authorization header](#authorization-header) for calling [/me]() route in Organization API
3. Function checks if Organization API response successful
4. Function responds with the response of Organization API response

## Locker application API:

### POST /pin => Enter pin for a cabinet

Request body:

```
{
  "type": "<either 'delivery' or 'pickup'>",
  "pin": 12345,
  "location": "helsinki"
}
```

Response object:

```
{
  "status": "success",
  "message": "<Organization API message>"
}
```

1. Function checks if all the required fields (type, pin, location) are present in request body
2. Dependingly on request type (delivery, pickup) function calls Organization API endpoint [/cabinet/delivery](#post-cabinetdelivery--try-to-deliver-a-parcel) (for type delivery) or [/cabinet/pickup](#post-cabinetpickup--try-to-pick-up-a-parcel) (for type pickup)
3. Function checks if Organization API response successful
4. Function sends Organization API message

## Organization API:

### POST /consumer/signup => Sign up the user

Request body:

```
{
  "username": "John Doe",
  "password": "98787r623",
  "email": "hello@email.com",
  "location": "helsinki"
}
```

Response object:

```
{
  "status": "success",
  "access_token": "token_value"
}
```

1. Function checks if user with the same email already exists
2. Function encrypts user password
3. Function [signs](#sign-tokens) access_token and refresh_token
4. Function creates a new user in "users" table including refresh_token
5. Function returns access_token in response object

### POST /consumer/login => Log in the user

Request body:

```
{
  "user_email": "example@email.com",
  "password": "hello1234"
}
```

Response object:

```
{
  "status": "success",
  "access_token": "token_value"
}
```

1. Function checks for user existence
2. Function compares hashed passwords from a DB and from user input
3. Function [signs](#sign-tokens) access_token and refresh_token
4. Function updates user refresh_token in DB
5. Function returns access_token in response object

### POST /cabinet/delivery => Try to deliver a parcel

Request body:

```
{
  "pin": 12345,
  "location": "helsinki"
}
```

Response object:

```
{
  "status": "success",
  "message": "Parcel delivered."
}
```

1. Function looks through parcels if delivery_pin of any parcel matches pin passed into request
2. Function checks if location of the cabinet is the same as location from where request passed
3. Function creates timestamp object:

```
{
  "timestamp": "time",
  "status": "<one of three statuses described in next three steps>"
}
```

4. Function checks if location of the cabinet is "warehouse", then parcel status changes to "at warehouse"
5. Function checks if location of the cabinet is the same as location of the sender, then parcel status changes to "prepared for delivery"
6. Function checks if location of the cabinet is the same as location of the reciever, then parcel status changes to "ready for pick up", and function generates pickup_pin for the parcel
7. Function populates parcel status_timestamps array with new timestamp object
8. Function sets cabinet status to "occupied" and sets parcel_id in cabinets' parcel_id field
9. Function responds with message of the operation

### POST /cabinet/pickup => Try to pick up a parcel

Request body:

```
{
  "pin": 12345,
  "location": "helsinki"
}
```

Response object:

```
{
  "status": "success",
  "message": "Parcel picked up."
}
```

1. Function looks through parcels if pickup_pin of any parcel matches pin passed into a request
2. Function checks if location of the cabinet is the same as location from where request passed
3. Function creates timestamp object:

```
{
  "timestamp": "time",
  "status": "<one of three statuses described in next three steps>"
}
```

4. Function checks if location of the cabinet is "warehouse" or same as location of the sender, then parcel status changes to "en route", and function generates delivery_pin for the parcel
5. Function checks if location of the cabinet is the same as location of the reciever, then parcel status changes to "delivered"
6. Function populates parcel status_timestamps array with new timestamp object
7. Function sets cabinet status to "free" and sets cabinet parcel_id field to null
8. Function responds with message of the operation

### GET /me => Applications load function

Request headers:

```
{
  "Authorization": "Bearer <access_token_value>"
}
```

Response object (user_type = consumer):

```
{
 "status": "success",
 "username": "<username>",
 "notifications": [
   {
     "parcel_id": "<parcel_id>",
     "title": "<notification_title>",
     "status": "<parcel_status>"
   },...
 ]
}
```

Response object (user_type = driver):

```
{
 "status": "success",
 "username": "<username>"
}
```

1. This route is [protected](#protect-function-in-organization-api)
2. Function gets "user_type" and "id" of a user requesting this route in req.user object
3. Function checks if "user_type" is consumer, then it gets the actual username as well as user parcels where "notify" field is set to "true" from a DB
4. Function checks if "use_type" is driver, then it gets the actual username from a DB
5. Function returns username in both scenarios, but it also returns notifications if "user_type" is consumer
