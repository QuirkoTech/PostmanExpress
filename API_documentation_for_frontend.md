# How to use application APIs in frontend

## NAVIGATION

-   [Consumer application endpoints](#consumer-application)

    -   [Sign up](#sign-up)
    -   [Log in](#log-in)
    -   [Log out](#log-out)
    -   [Delete](#Delete)
    -   [Load function](#consumer-application-load-function)
    -   [User active parcels](#user-active-parcels)
    -   [Post new parcels](#post-new-parcels)
    -   [Parcel info](#parcel-info)
    -   [Parcel history](#parcel-history)

-   [Driver application](#driver-application)

    -   [Sign up](#sign-up-1)
    -   [Log in](#log-in-1)
    -   [Log out](#log-out-1)
    -   [Load function](#driver-application-load-function)
    -   [Accepted parcels](#accepted-parcels)
    -   [Available parcels](#available-parcels)
    -   [Parcel info](#parcel-info-1)
    -   [Accept the parcel](#accept-the-parcel)

-   [Locker application](#locker-application)

    -   [Deliver](#deliver-the-parcel)
    -   [Pick up](#pick-up-the-parcel)

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

1. Access token cookie is set for a user
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

### Post new parcels

To post new parcels make a POST request to "/parcels/new" route

-   NOTE: need to have "credentials": "include" in the request, but i dont know if it has to be set in request headers. This is needed to pass the access_token cookie to the API
-   NOTE: you can leave parcel_name field as an empty string when user submits the parcel, API will automatically replace empty string with "Parcel"

Request body:

```
{
  "parcel_name": "",
  "recipient_email": "test@mail.com",
  "ship_to": "helsinki",
  "ship_from": "oulu",
  "weight": "1",
  "height": "3",
  "width": "1",
  "length": "1"
}
```

Response object:

```
{
 "status": "success",
 "data": {
   "message": "Parcel created. Check your email for further instructions."
 }
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

### Delete

To delete the user, make a DELETE request to the consumer API endpoint "/me"

-   NOTE: need to have "credentials": "include" in the request. This is needed to pass the access_token cookie to the API

Request headers:

```
{
  "Content-type": "application/json"
}
```

In respose from this endpoint you will get:

If response is successfull:

1. Access token cookie is deleted
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

### Log out

To log out the user, make a POST request to the consumer API endpoint "/auth/logout"
Requiremets:

Request headers:

```
{
  "Content-type": "application/json"
}
```

In respose from this endpoint you will get:

If response is successfull:

1. Access token cookie deleted
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

-   NOTE: need to have "credentials": "include" in the request. This is needed to pass the access_token cookie to the API

If response is successfull:

1. Object like this:

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

If response failed:

1. Object like this:

```
{
  "status": "<fail or error>",
  "message": "<response message>"
}
```

### User active parcels

To load user active parcels make a GET request to "/me/parcels" route

-   NOTE: need to have "credentials": "include" in the request. This is needed to pass the access_token cookie to the API

If response is successfull:

1. Object like this:

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

If response failed:

1. Object like this:

```
{
  "status": "<fail or error>",
  "message": "<response message>"
}
```

### Post new parcels

To post new parcels make a POST request to "/parcels/new" route

-   NOTE: need to have "credentials": "include" in the request. This is needed to pass the access_token cookie to the API
-   NOTE: you can leave parcel_name field as an empty string when user submits the parcel, API will automatically replace empty string with "Parcel"

Request body:

```
{
  "parcel_name": "",
  "recipient_email": "test@mail.com",
  "ship_to": "helsinki",
  "ship_from": "oulu",
  "weight": "1",
  "height": "3",
  "width": "1",
  "length": "1"
}
```

If response is successfull:

1. Object like this:

```
{
 "status": "success",
 "data": {
   "message": "Parcel created. Check your email for further instructions."
 }
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

### Parcel info

To get the parcel info, make a GET request to "/parcels/:parcel_id", ":parcel_id" is a parameter

-   NOTE: need to have "credentials": "include" in the request. This is needed to pass the access_token cookie to the API

There are two scenarios of what you will get in response:

-   First is when user is the sender or receiver of the parcel AND he is logged in:

If response is successfull:

1. Object like this:

```
{
    "status": "success",
    "data": {
        "parcel_info": {
            "parcel_id": "c604a188-a441-4a5b-a1b5-3c44a000ccaf",
            "sender_name": "RepoRover",
            "receiver_name": "test@mail.com",
            "parcel_status": "awaiting drop-off",
            "status_timestamps": [
                {
                    "date": "16.11.23",
                    "time": "15:40",
                    "status": "awaiting drop-off"
                }
            ],
            "width": 1,
            "height": 3,
            "length": 1,
            "weight": 1,
            "parcel_name": "Parcel",
            "ship_to": "helsinki",
            "ship_from": "oulu"
        },
        "authorized": true
    }
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

-   Second is when user is not logged in or if he is not the sender or receiver of the parcel

If response is successfull:

1. Object like this:

```
{
    "status": "success",
    "data": {
        "parcel_info": {
            "parcel_id": "c604a188-a441-4a5b-a1b5-3c44a000ccaf",
            "parcel_status": "awaiting drop-off",
            "status_timestamps": [
                {
                    "date": "16.11.23",
                    "time": "15:40",
                    "status": "awaiting drop-off"
                }
            ],
            "ship_to": "helsinki",
            "ship_from": "oulu"
        },
        "authorized": false
    }
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

### Parcel history

To get user parcel history make a GET request to "/me/history" route

-   NOTE: need to have "credentials": "include" in the request. This is needed to pass the access_token cookie to the API

If response is successfull:

1. Object like this:

```
{
    "status": "success",
    "data": {
        "parcels": [
            {
                "last_status_date": "18.11.23",
                "parcel_id": "14322898-dc21-4b47-98cc-0a276b20fa0d",
                "parcel_status": "delivered",
                "parcel_name": "Bottle of wine"
            }
        ]
    }
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

1. Access token cookie is set for a driver
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

1. Access token cookie is set for a driver
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

### Log out

To log out the driver, make a POST request to the driver API endpoint "/auth/logout"
Requiremets:

Request headers:

```
{
  "Content-type": "application/json"
}
```

In respose from this endpoint you will get:

If response is successfull:

1. Access token cookie deleted
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

### Driver application load function

To load the driver into the application make a GET request to "/me" route

-   NOTE: need to have "credentials": "include" in the request. This is needed to pass the access_token cookie to the API

If response is successfull:

1. Object like this:

```
{
  "status": "success",
  "data": {
    "driver_name": "<driver_name>"
  }
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

### Accepted parcels

To get driver accepted parcels make GET request to "/me/parcels" route in driver API

-   NOTE: need to have "credentials": "include" in the request. This is needed to pass the access_token cookie to the API

If response is successfull:

1. Object like this:

```
{
  "status": "success",
  "data": {
    "parcels": [
      {
        "last_status_date": "21.11.23",
        "parcel_id": "2044b3bb-6855-4334-a82c-a77b55a413f3",
        "ship_to": "warehouse"
      }
    ]
  }
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

### Available parcels

To get driver available parcels make GET request to "/parcels" route in driver API

-   NOTE: need to have "credentials": "include" in the request. This is needed to pass the access_token cookie to the API

If response is successfull:

1. Object like this:

```
{
  "status": "success",
  "data": {
    "parcels": [
      {
        "last_status_date": "21.11.23",
        "parcel_id": "2044b3bb-6855-4334-a82c-a77b55a413f3",
        "ship_to": "warehouse"
      }
    ]
  }
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

### Parcel info

To get the parcel info, make a GET request to "/parcels/:parcel_id", ":parcel_id" is a parameter

-   NOTE: need to have "credentials": "include" in the request. This is needed to pass the access_token cookie to the API
-   NOTE: the field "driver_accepted" indicates if the parcel is already accepted by any driver and it is used for dispaying "Accept" button in driver application parcel info page, so if this field is set to "true" no need to dispay "Accept" button

There are two scenarios:

-   First is when logged in driver accepted the parcel

If response is successfull:

1. Object like this:

```
{
    "status": "success",
    "data": {
        "parcel_info": {
            "parcel_id": "ce32b3c5-788f-467c-bce3-9935fbb42fce",
            "ship_to": "warehouse",
            "current_location": "oulu",
            "pickup_pin": null,
            "delivery_pin": null,
            "length": 1,
            "height": 3,
            "width": 1,
            "weight": 1,
            "driver_accepted": true
        }
    }
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

-   Second is when driver is able to deliver the parcel (it means that drivers' location city is the same as where parcel has to be shipped or from where it has ot be shipped), but hasn't accepted it yet or probably someone else accepted it

If response is successfull:

1. Object like this:

```
{
    "status": "success",
    "data": {
        "parcel_info": {
            "parcel_id": "ce32b3c5-788f-467c-bce3-9935fbb42fce",
            "ship_to": "warehouse",
            "current_location": "oulu",
            "length": 1,
            "height": 3,
            "width": 1,
            "weight": 1,
            "driver_accepted": <false or true>
        }
    }
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

### Accept the parcel

To accept the parcel, make a PATCH request to "/parcels/:parcel_id" route in driver API

-   NOTE: need to have "credentials": "include" in the request. This is needed to pass the access_token cookie to the API

If response is successfull:

1. Object like this:

```
{
    "status": "success",
    "data": {
        "pickup_pin": 28374
    }
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

## Locker application

### Deliver the parcel

To deliver the parcel, make a POST request to "/cabinet/deliver" route in locker API

expected request body
```
{
  "type": "delivery",
  "pin": 12345,
  "cabinet_location": "helsinki"
}
```

If response is successfull:

1. Object like this:

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

### Pick up the parcel

To pick up the parcel, make a POST request to "/cabinet/pickup" route in locker API

expected request body

```
{
  "type": "pickup",
  "pin": 12345,
  "cabinet_location": "helsinki"
}
```

If response is successfull:

1. Object like this:

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
