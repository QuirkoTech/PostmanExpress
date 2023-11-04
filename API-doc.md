# Navigation:
- [Consumer Application API](#consumer-application-api)
  + [Login endpoint](#login--log-in-the-user)
  + [Signup endpoint](#signup--sign-up-the-user)

- [Driver Application API](#driver-application-api)
  + [Login endpoint](#login--log-in-the-driver)

- [Locker API](#locker-application-api)

- [Organization API](#organization-api)
  + [Consumer signup endpoint](#consumersignup--sign-up-the-user)
  + [Consumer login endpoint](#consumerlogin--log-in-the-user)


## Consumer application API:

### /signup => Sign up the user

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

1. Function checks if all the required fields (user_email, password, password_confirm, username, location) are present in request body
2. Function calles Organization API endpoint [/consumer/signup](#consumersignup--sign-up-the-user)
3. Function checks if Organization API response successful 
4. Function sets access_token cookie to a user


### /login => Log in the user

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

1. Function checks if all the required fields (user_email, password) are present in request body
2. Function calles Organization API endpoint [/consumer/login](#consumerlogin--log-in-the-user)
3. Function checks if Organization API response successful 
4. Function sets access_token cookie to a user


## Driver application API:

### /login => Log in the driver
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
3. Function signs access_token and refresh_token
4. Function updates user refresh_token in DB
5. Function sets access_token cookie to a driver


## Organization API:

### /consumer/signup => Sign up the user
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
3. Function signs access_token and refresh_token
4. Function creates a new user in "users" table including refresh_token
5. Function returns access_token in response object



### /consumer/login => Log in the user
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
3. Function signs access_token and refresh_token
4. Function updates user refresh_token in DB
5. Function returns access_token in response object


## Locker application API: