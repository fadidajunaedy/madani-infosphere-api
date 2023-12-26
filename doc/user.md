# User API Spec

## Register User API

Endpoint : POST /api/users/register

Request Body :

```json
{
  "name": "fadidajunaedy",
  "username": "fadidajunaedy",
  "email": "fadidajunaedy@gmail.com",
  "password": "Rahasia123-",
  "position": "Executive Director"
}
```

Response Body Success :

```json
{
  "success": true,
  "message": "User register successfully",
  "data": {
    "id": 1,
    "name": "Fadida Zanetti Junaedy",
    "username": "fadidajunaedy",
    "email": "fadidajunaedy@gmail.com",
    "position": "Executive Director"
  }
}
```

```code
Verification Email Token sent to registered email
```

Response Body Error :

```json
{
  "errors": "email already registered"
}
```

## Verify Email User API

Endpoint : PATCH /api/users/verify/:token

Response Body Success :

```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

Response Body Error :

```json
{
  "errors": "Invalid token"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "email": "fadidajunaedy@gmail.com",
  "password": "Rahasia123-"
}
```

Response Body Success :

```json
{
  "success": true,
  "message": "User login successfully"
}
```

Response Cookies :

- accessToken : unique-token
- refreshToken : unique-token

Response Body Error :

```json
{
  "errors": "Email or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/me

Request Cookies :

- accessToken : unique-token

Request Body :

```json
{
  "name": "Fadida Junaedy", // optional
  "position": "HRGA" // optional
}
```

Response Body Success :

```json
{
  "success": true,
  "message": "User update successfully",
  "data": {
    "id": 1,
    "name": "Fadida Junaedy",
    "username": "fadidajunaedy",
    "email": "fadidajunaedy@gmail.com",
    "position": "HRGA"
  }
}
```

Response Body Error :

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/me

Request Cookies :

- accessToken : unique-token

Response Body Success:

```json
{
  "success": true,
  "message": "Get user successfully",
  "data": {
    "id": 1,
    "name": "Fadida Junaedy",
    "username": "fadidajunaedy",
    "email": "fadidajunaedy@gmail.com",
    "password": "Rahasia123-", // should be encryption by bcrypt
    "position": "HRGA",
    "role": "user",
    "isVerified": true, // should verify email first
    "status": true // admin or super-admin would activate the status
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Request Cookies :

- accessToken : unique-token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Change Password API

Endpoint : POST /api/users/change-password

Request Cookies :

- accessToken : unique-token

Request Body Success:

```json
{
  "currentPassword": "Rahasia123-",
  "newPassword": "MasihRahasia123-"
}
```

Response Body Success :

```json
{
  "success": true,
  "message": "Change password successfully"
}
```

Response Body Error :

```json
{
  "errors": "Current password is wrong"
}
```

## Forgot Password API

Endpoint : POST /api/users/forgot-password

Request Body Success:

```json
{
  "email": "fadidajunaedy@gmail.com"
}
```

```code
Token reset password sent to email
```

Response Body Success :

```json
{
  "success": true,
  "message": "Email reset Password has sent to email"
}
```

Response Body Error :

```json
{
  "errors": "Email is not found"
}
```

## Reset Password API

Endpoint : POST /api/users/reset-password

Request Body Success:

```json
{
  "token": "unique-token",
  "newPassword": "Rahasia2-"
}
```

```json
{
  "success": true,
  "message": "Reset password successfully"
}
```

Response Body Error :

```json
{
  "errors": "Invalid token"
}
```

## Create User API (Admin)

Endpoint : POST /api/users

Request Cookies :

- accessToken : unique-token (role: admin or super-admin)

Request Body :

```json
{
  "name": "Fadida Zanetti Junaedy",
  "username": "fadidajunaedy24",
  "email": "fadidajunaedy24@gmail.com",
  "position": "HRGA",
  "password": "Qq332211-",
  "isVerified": true,
  "status": true
}
```

Response Body Success :

```json
{
  "success": true,
  "message": "User create successfully",
  "data": {
    "id": 2,
    "name": "Fadida Zanetti Junaedy",
    "username": "fadidajunaedy24",
    "email": "fadidajunaedy24@gmail.com",
    "password": "Qq332211-", // would be hashing
    "position": "HRGA",
    "role": "user",
    "isVerified": true,
    "status": true,
    "createdAt": "2023-12-26T15:56:49.520Z",
    "updatedAt": "2023-12-26T15:56:49.520Z",
    "verificationToken": null,
    "refreshToken": null,
    "resetPasswordToken": null
  }
}
```

Response Body Error :

```json
{
  "errors": "Email already registered"
}
```

## Update User API (Admin)

Endpoint : PATCH /api/users/:id

Request Cookies :

- accessToken : unique-token (role: admin or super-admin)

Request Body :

```json
{
  "name": "Fadida Zanetti", //optional
  "password": "Rahasia123-", //optional
  "position": "Klima", //optional
  "isVerified": false, //optional
  "status": false
}
```

Response Body Success :

```json
{
  "success": true,
  "message": "User update successfully",
  "data": {
    "id": 2,
    "name": "Fadida Zanetti",
    "username": "fadidajunaedy24",
    "email": "fadidajunaedy24@gmail.com",
    "password": "Rahasia123-", // would be hashing
    "position": "Klima",
    "role": "user",
    "isVerified": false,
    "status": false,
    "createdAt": "2023-12-26T15:56:49.520Z",
    "updatedAt": "2023-12-26T17:25:48.936Z",
    "verificationToken": null,
    "refreshToken": null,
    "resetPasswordToken": null
  }
}
```

Response Body Error :

```json
{
  "errors": "User is not found"
}
```

## Get User API (Admin)

Endpoint : GET /api/users/:id

Request Cookies :

- accessToken : unique-token (role: admin or super-admin)

Response Body Success:

```json
{
  "success": true,
  "message": "Get user successfully",
  "data": {
    "id": 1,
    "name": "fadidazanetti",
    "username": "fadidazanetti",
    "email": "fadidazanetti@gmail.com",
    "password": "Rahasia123-",
    "position": "HRGA",
    "role": "user",
    "isVerified": true,
    "status": false
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Get All User API (Admin)

Endpoint : GET /api/users

Request Cookies :

- accessToken : unique-token (role: admin or super-admin)

Response Body Success:

```json
{
  "success": true,
  "message": "Get users successfully",
  "data": [
    {
      "id": 1,
      "name": "fadidazanetti",
      "username": "fadidazanetti",
      "email": "fadidazanetti@gmail.com",
      "password": "Rahasia123-",
      "position": "HRGA",
      "role": "user",
      "isVerified": true,
      "status": false
    },
    {...}
  ]
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Delete User API (Admin)

Endpoint : DELETE /api/reports/:id

Request Cookies :

- accessToken : unique-token (role: admin or super-admin)

Response Body Success :

```json
{
  "success": true,
  "message": "Deleted Data Successfully"
}
```

Response Body Error :

```json
{
  "errors": "User is not found"
}
```
