# cafe-management-system-api

# Documentation
## Requests

### GET | Get User Profile Info By Id
```
/profile/:id
```
#### Request Headers
* Authorization: token

#### Response
```
{
    "_id": "63e62be8e40470d956f6eb7a",
    "username": "pass",
    "email": "pass@gmail.com",
    "gender": "male",
}
```
---
### GET | Get User Profile Image
```
/profile/userImage/:id
```
#### Request Headers
* Authorization: token

#### Response
```
{
    "_id": "63e62be8e40470d956f6eb7a",
    "userImage": "image url"
}
```
---
### PATCH | Edit Username
```
/profile/username/:id
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
    "_id": "63e62be8e40470d956f6eb7a",
    "username": "updated username"
}
```
---
### PATCH | Edit Email
```
/profile/email/:id
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
    "_id": "63e62be8e40470d956f6eb7a",
    "email": "updated email"
}
```
---
### PATCH | Edit Gender
```
/profile/gender/:id
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
    "_id": "63e62be8e40470d956f6eb7a",
    "gender": "male/female"
}
```
---
### PATCH | Change Password
```
/profile/changepassword/:id
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
    "_id": "63e62be8e40470d956f6eb7a",
    "password": "updated password"
}
```
---
### PATCH | Edit user Profile Image
```
/profile/userImage/:id
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
    "_id": "63e62be8e40470d956f6eb7a",
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