# Documentation

## All Requests

- [GET User Profile Info](#get--get-user-profile-info)
- [Edit User Profile Info](#patch--edit-user-profile-info)
- [Edit Username](#patch--edit-username)
- [Edit Email](#patch--edit-email)
- [Edit Gender](#patch--edit-gender)
- [Change Password](#patch--change-password)
- [Get User Profile Image](#get--get-user-profile-image)
- [Edit User Profile Image](#patch--edit-user-profile-image)
- [Get All Users](#get--get-all-users)
- [User Login](#post--user-login)
- [Admin Login](#post--admin-login)
- [User SignUp](#post--signup)
- [Purchase](#post--purchase-make-an-order)
- [Get User Orders](#get--get-all-orders)
- [Cancel User Order](#delete--cancel-user-order)
- [Get All Orders](#get--get-all-orders)
- [Get All Products](#get--get-all-products)
- [Get Product By ID Using Search Query](#get--get-product-by-id--name--price----using-search-query)
- [Get Product By ID Using Query Params](#get--get-product-by-id----using-query-params)
- [Create New Product](#post--create-new-product)
- [Update Product](#patch--update-product)
- [Delete Product](#delete--delete-product)
- [Upload Image](#put--upload-image)
- [Get Promoted Products](#get--get-promoted-products)

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

### GET | Get all users

```
/profile/all
```

#### Response

```
[
    {
        "_id": "63ec1ad0048d87baf78c10a3",
        "username": "abdallahnagy",
        "email": "abdallahnagy",
        "password": "$2b$10$pf7N5n1uy9h9FsVXhhPiievOGP2qQ5gPc0cLS44t9pyPg72J0ZrSi",
        "gender": "male",
        "orders": [
            "63ee8a1aa7275c207a25a1bc",
            "63ee8ffe0ed264678a07bd6f",
            "63ee8fff0ed264678a07bd74",
            "63ee90659c958f6618044fec",
            "63ee90669c958f6618044ff1",
            "63ee91357b9e04c6db5beb2b",
            "63ee93068aecead3066f2847",
            "63ee9400ca8c05c234379b0d",
            "63ee94905f424bea2c86b80f"
        ],
        "__v": 33,
        "userImage": "http://localhost:3000/63ec1ad0048d87baf78c10a3_man.png"
    }
]
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

returns updated user orders

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

### PATCH | change order status

```
/orders/:id
```

#### Request Headers

- Content-Type: application/json

#### Request Body

```
{
    "status": "accepted or rejected"
}
```

#### Response

returns the updated order

```
{
    "_id": "63f3188ad34d710d4d788f90",
    "userId": "63f1019235616e754b68a208",
    "productId": "63eb407c7f213bc350607f4d",
    "amount": 1,
    "totalPrice": 150,
    "status": "rejected/accepted",
    "__v": 0
}
```

---

### GET | get all orders

```
/orders/all
```

#### Response

returns array of orders

```
[
    {
        "_id": "63f1ac6a26fee32859ec797e",
        "userId": {
            "_id": "63f11ab5b373b70370958065",
            "username": "karim",
            "email": "karim@gmail.com",
            "password": "$2b$10$dFzAqskqhKJeRBiiR9aH..yMI0cBYRsJeRV4q3aintiaTIdILxuZq",
            "gender": "male",
            "userImage": "http://localhost:3000/defProfileImage.png",
            "orders": [
                "63f1aa72e5b78b2acc4c8be9",
                "63f1aaabe5b78b2acc4c8bfa",
                "63f1ac6926fee32859ec7979",
                "63f1ac6a26fee32859ec797e"
            ],
            "__v": 6
        },
        "productId": {
            "_id": "63eb410f87e48a6731b4cc4c",
            "name": "Glacé",
            "price": 150,
            "description": "Amazing",
            "photo": "http://localhost:3000/14Glacé.jpg",
            "__v": 0
        },
        "amount": 1,
        "totalPrice": 150,
        "status": "pending",
        "__v": 0
    }
]
```

### GET | Get All Products

```
/api/products
```

#### Response

```
{
    "success": true,
    "count": 2,
    "views": 5
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

### GET | get promoted products

```
/promotions
```

#### Response

```
[
    {
        "_id": "63e8f2031ebb0a2061cb1009",
        "name": "Latte",
        "price": 13.2,
        "description": "Amazing Coffee",
        "photo": "http://localhost:3000/3Latte.jpg"
    }
]
```

---
