# cafe-management-system-api

# Documentation
## Requests

### GET | Get User Profile Info
```
/profile
```
#### Request Headers
* Authorization: token

#### Response
```
{
    "username": "pass",
    "email": "pass@gmail.com",
    "gender": "male",
}
```
---
### GET | Get User Profile Image
```
/profile/userImage
```
#### Request Headers
* Authorization: token

#### Response
```
{
    "userImage": "image url"
}
```
---
### PATCH | Edit Username
```
/profile/username
```
#### Request Headers
* Authorization: token
* Content-Type: application/json

#### Request Body
```
{
    "username": "ahmed"
}
```

#### Response
```
{
    "username": "updated username"
}
```
---
### PATCH | Edit Email
```
/profile/email
```
#### Request Headers
* Authorization: token
* Content-Type: application/json

#### Request Body
```
{
    "email": "user@gmail.com"
}
```
#### Response
```
{
    "email": "updated email"
}
```
---
### PATCH | Edit Gender
```
/profile/gender
```
#### Request Headers
* Authorization: token
* Content-Type: application/json

#### Request Body
```
{
    "gender": "female/male"
}
```
#### Response
```
{
    "gender": "male/female"
}
```
---
### PATCH | Change Password
```
/profile/changepassword
```
#### Request Headers
* Authorization: token
* Content-Type: application/json

#### Request Body
```
{
    "oldPassword": "1234",
    "newPassword": "12345"
}
```
#### Response
```
{
    "isUpdated": "true"
}
```
---
### PATCH | Edit user Profile Image
```
/profile/userImage
```
#### Request Headers
* Authorization: token
* Content-Type: multipart/form-data

#### Request Body
```
{
    "userImage": "actual image"
}
```
#### Response
```
{
    "userImage": "updated url image"
}
```
---
### POST | Login
```
/reg/login
```
#### Request Headers
* Authorization: token
* Content-Type: application/json

#### Request Body
```
{
    "email": "user@gmail.com",
    "password": "1234"
}
```
#### Response
```
{
    "accessToken": "token"
}
```
---
### POST | SignUp
```
/reg/signup
```
#### Request Headers
* Authorization: token
* Content-Type: application/json

#### Request Body
```
{
    "username": "username",
    "email": "user@gmail.com",
    "password": "1234",
    "confirmPassword": "1234",
    "gender": "male/female"
}
```
#### Response
```
{
    "accessToken": "token"
}
```
---