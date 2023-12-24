# Contact API Spec

## Get All Contact API

Endpoint : GET /api/contacts

Request Cookies :

- accessToken : unique-token

Response Body Success :

```json
{
  "success": true,
  "message": "Get Contacts Successfully",
  "data": [
    {
      "id": 1,
      "name": "Rachmat Hidayat Insani",
      "institution": "WRI Indonesia",
      "email": "rachmathidayat@gmail.com",
      "city": "Jakarta",
      "telephone": "089500000000",
      "position": "Staf",
      "category": "madani-care",
      "classification": null,
      "createdUser": "fadidajunaedy"
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

## Get Contact API

Endpoint : GET /api/contacts/:id

Request Cookies :

- accessToken : unique-token

Response Body Success :

```json
{
  "success": true,
  "message": "Get Contact Successfully",
  "data": {
    "id": 1,
    "name": "Rachmat Hidayat Insani",
    "institution": "WRI Indonesia",
    "email": "rachmathidayat@gmail.com",
    "city": "Jakarta",
    "telephone": "089500000000",
    "position": "Staf",
    "category": "madani-care",
    "classification": null,
    "createdUser": "fadidajunaedy"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Create Contact API

Endpoint : POST /api/contacts

Request Cookies :

- accessToken : unique-token

Request Body Success :

```json
{
  "name": "Rachmat Hidayat Insani",
  "institution": "WRI Indonesia",
  "email": "rachmathidayat@gmail.com",
  "city": "Jakarta",
  "telephone": "089500000000",
  "position": "Staf",
  "category": "madani-care",
  "classification": null,
  "createdUser": "fadidajunaedy"
}
```

Response Body Success :

```json
{
  "success": true,
  "message": "Create Event Successfully",
  "data": {
    "id": 1,
    "name": "Rachmat Hidayat Insani",
    "institution": "WRI Indonesia",
    "email": "rachmathidayat@gmail.com",
    "city": "Jakarta",
    "telephone": "089500000000",
    "position": "Staf",
    "category": "madani-care",
    "classification": null,
    "createdUser": "fadidajunaedy"
  }
}
```

Response Body Error :

```json
{
  "errors": "Name is cannot be null"
}
```

## Update Contact API

Endpoint : PATCH /api/contacts/:id

Request Cookies :

- accessToken : unique-token

Request Body Success :

```json
{
  "name": "Rachmat Hidayat", //optional
  "institution": "WRI Indonesia", //optional
  "email": "rachmathidayat@gmail.com", //optional
  "city": "Bandung", //optional
  "telephone": "089500000000", //optional
  "position": "Staf", //optional
  "category": "madani-care", //optional
  "classification": null
}
```

Response Body Success :

```json
{
  "success": true,
  "message": "Updated Event Successfully",
  "data": {
    "id": 1,
    "name": "Rachmat Hidayat",
    "institution": "WRI Indonesia",
    "email": "rachmathidayat@gmail.com",
    "city": "Bandung",
    "telephone": "089500000000",
    "position": "Staf",
    "category": "madani-care",
    "classification": null,
    "createdUser": "fadidajunaedy"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Delete Contact API

Endpoint : DELETE /api/contacts/:id

Request Cookies :

- accessToken : unique-token

Response Body Success :

```json
{
  "success": true,
  "message": "Delete contact Successfully"
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```
