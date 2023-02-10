# cafe-management-system-api

# Requests

## GET | Get User Profile Info By Id
```
/profile/:id
```
### Request Headers
* Authorization: token

### Response
```
{
    "_id": "63e62be8e40470d956f6eb7a",
    "username": "pass",
    "email": "pass@gmail.com",
    "gender": "male",
}
```
## GET | Get User Profile Image
```
/profile/userImage/:id
```
### Request Headers
* Authorization: token

### Response
```
{
    "_id": "63e62be8e40470d956f6eb7a",
    "userImage": "image url"
}
```

## PATCH | Edit Username
```
/profile/username/:id
```
### Request Headers
* Authorization: token

### Response
```
{
    "_id": "63e62be8e40470d956f6eb7a",
    "username": "updated username"
}
```

## PATCH | Edit Email

## PATCH | Edit Gender

## PATCH | Change Password

## PATCH | Edit user Profile Image

## POST | Login

## POST | SignUp