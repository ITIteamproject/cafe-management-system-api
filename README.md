# cafe-management-system-api

# Documentation

## Requests

### GET | Get User Profile Info

```
/profile
```

#### Request Headers

- Authorization: token

#### Response

```
{
    "username": "pass",
    "email": "pass@gmail.com",
    "gender": "male",
}
```

---

### PATCH | Edit User Profile Info

```
/profile
```

#### Request Headers

- Authorization: token

#### Request body

```
{
    "email": "foo@gmail.com",
    "username": "foo",
    "gender": "male"
}
```

#### Response

```
{
    "email": "foo@gmail.com",
    "username": "foo",
    "gender": "male"
}
```

---

### GET | Get User Profile Image

```
/profile/userImage
```

#### Request Headers

- Authorization: token

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

- Authorization: token
- Content-Type: application/json

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

- Authorization: token
- Content-Type: application/json

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

- Authorization: token
- Content-Type: application/json

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

- Authorization: token
- Content-Type: application/json

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

### GET | get user Profile Image

```
/profile/userImage
```

#### Request Headers

- Authorization: token

#### Response

```
{
    "userImage": "image url"
}
```

---

### PATCH | Edit user Profile Image

```
/profile/userImage
```

#### Request Headers

- Authorization: token
- Content-Type: multipart/form-data

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

### POST | User Login

```
/reg/login
```

#### Request Headers

- Authorization: token
- Content-Type: application/json

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

### POST | Admin Login

```
/admin/login
```

#### Request Headers

- Authorization: token
- Content-Type: application/json

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

- Authorization: token
- Content-Type: application/json

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

### POST | Purchase (make an order)

```
/purchase
```

#### Request Headers

- Authorization: token
- Content-Type: application/json

#### Request Body

```
["product1 id", "product2 id"]
```

#### Response

returns list of orders

```
[
    {
        "_id": "63e9c8fce1e5bff66fc1d029",
        "userId": "63e4827cb01cc4b8fac999de",
        "productId": "63e961c66b87884e29323042",
        "status": "pending",
        "__v": 0
    },
    {
        "_id": "63e9c8fce1e5bff66fc1d02c",
        "userId": "63e4827cb01cc4b8fac999de",
        "productId": "63e962176b87884e29323044",
        "status": "pending",
        "__v": 0
    }
]
```

---

### GET | get user orders

```
/orders
```

#### Request Headers

- Authorization: token
- Content-Type: application/json

#### Response

returns list of user orders

```
[
    {
        "_id": "63e963956b87884e29323048",
        "userId": "63e4827cb01cc4b8fac999de",
        "productId": {
            "_id": "63e961c66b87884e29323042",
            "name": "coffee",
            "price": 10,
            "description": "amazing drink",
            "__v": 0
        },
        "status": "pending",
        "__v": 0
    }
]
```

---

### DELETE | cancel user order

```
/orders/?orderId=123
```

#### Request Headers

- Authorization: token
- Content-Type: application/json

#### Response

returns list of user orders

```
{
    "isCanceled": true
}
```

---

### GET | Get All Products

```
/api/products
```

#### Response

```
{
    "success": true,
    "count": 2,
    "data": [
        {
            "_id": "63e8f2031ebb0a2061cb1009",
            "name": "Latte",
            "price": 13.2,
            "description": "Amazing Latte",
            "photo": "http://localhost:3000/3Latte.jpg",
            "__v": 0
        }
        ,
        {
            "_id": "63e8f2031ebb0a2061cb1509",
            "name": "Tea",
            "price": 13.2,
            "description": "Amazing Coffee",
            "photo": "http://localhost:3000/Tea.jpg",
            "__v": 0
        }
      ]
}
```

---

### GET | Get Product by ID | Name | Price -- Using Search Query

```
/api/products?searchQuery
```

#### Response

```
{
    "success": true,
    "count": 1,
    "data": [
        {
            "_id": "63e8f2031ebb0a2061cb1009",
            "name": "Latte",
            "price": 13.2,
            "description": "Amazing Coffee",
            "photo": "http://localhost:3000/3Latte.jpg",
            "__v": 0
        }
}
```

---

### GET | Get Product by ID -- Using Query Params

```
/api/products/:id
```

#### Response

```
{
    "success": true,
    "data": {
        "_id": "63e8f1e71ebb0a2061cb1007",
        "name": "FrenchCappuccino",
        "price": 40,
        "description": "Amazing Juice",
        "photo": "http://localhost:3000/7FrenchCappuccino.jpg",
        "__v": 0
    }
}
```

---

### POST | Create New Product

```
/api/products
```

#### Request Headers

- Content-Type: application/json

#### Response

```
{
    "success": true,
    "data": {
        "_id": "63e8f1e71ebb0a2061cb1007",
        "name": "FrenchCappuccino",
        "price": 40,
        "description": "Amazing Juice",
        "photo": "http://localhost:3000/7FrenchCappuccino.jpg",
        "__v": 0
    }
}
```

---

### PATCH | Update Product

```
/api/products/:id
```

#### Request Headers

- Content-Type: application/json

#### Response

```
{
    "success": true,
    "data": {
        "_id": "63e8f1e71ebb0a2061cb1007",
        "name": "FrenchCappuccino",
        "price": 40,
        "description": "Amazing Juice",
        "photo": "http://localhost:3000/7FrenchCappuccino.jpg",
        "__v": 0
    }
}
```

---

### DELETE | Delete Product

```
/api/products/:id
```

#### Response

```
204 No Content
```

---

### PUT | Upload Image

```
/api/products/:id/photo
```

#### Request Headers

- Content-Type: multipart/form-data

#### Response

```
{
    "success": true,
    "data":"http://localhost:3000/7FrenchCappuccino.jpg"
}
```

---
