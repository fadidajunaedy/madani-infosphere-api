# Report API Spec

## Get All Report API

Endpoint : GET /api/reports

Request Query : subcategory (optional)

Request Cookies :

- accessToken : unique-token

Response Body Success :

```json
{
  "success": true,
  "message": "Get Report Successfully",
  "data": [
    {
      "tags": ["madani-care", "hutan"],
      "id": 1,
      "title": "Peduli Hutan Jakarta",
      "category": "program",
      "subcategory": "hutan-dan-iklim",
      "description": "lorem ipsum dolor si amet",
      "file": null,
      "linkFile": "https://somefiles.com",
      "relatedProgram": null,
      "year": "2023",
      "createdUser": "fadidajunaedy",
      "createdAt": "2023-12-23T11:41:22.000Z",
      "updatedAt": "2023-12-23T11:41:22.000Z"
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

## Get Report API

Endpoint : GET /api/reports/:id

Request Cookies :

- accessToken : unique-token

Response Body Success :

```json
{
  "success": true,
  "message": "Get Report Successfully",
  "data": [
    {
      "tags": ["madani-care", "hutan"],
      "id": 1,
      "title": "Peduli Hutan Jakarta",
      "category": "program",
      "subcategory": "hutan-dan-iklim",
      "description": "lorem ipsum dolor si amet",
      "file": null,
      "linkFile": "https://somefiles.com",
      "relatedProgram": null,
      "year": "2023",
      "createdUser": "fadidajunaedy",
      "createdAt": "2023-12-23T11:41:22.000Z",
      "updatedAt": "2023-12-23T11:41:22.000Z"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "Report is not found"
}
```

## Create Report API

Endpoint : POST /api/reports

Request Cookies :

- accessToken : unique-token

Request Body :

```json
{
  "title": "Peduli Sungai Jakarta",
  "category": "program",
  "subcategory": "hutan-dan-iklim",
  "description": "lorem ipsum dolor",
  "tags": ["tag1", "tags2"],
  "year": 2012, //
  "link": null, // optional
  "linkFile": "https://somefiles.com", //optional
  "relatedProgram": null //optional
}
```

Response Body Success :

```json
{
  "success": true,
  "message": "Create Data Successfully",
  "data": {
    "tags": ["tag1", "tags2"],
    "id": 2,
    "title": "Peduli Sungai Jakarta",
    "category": "program",
    "subcategory": "hutan-dan-iklim",
    "description": "lorem ipsum dolor",
    "year": 2012,
    "linkFile": "https://somefiles.com",
    "createdUser": "fadidajunaedy",
    "updatedAt": "2023-12-23T14:56:19.843Z",
    "createdAt": "2023-12-23T14:56:19.843Z"
  }
}
```

Response Body Error :

```json
{
  "errors": "Between link and linkFile must be filled with one of the following"
}
```

## Update Report API

Endpoint : PATCH /api/reports/:id

Request Cookies :

- accessToken : unique-token

Request Body :

```json
{
  "title": "This is new Title 2", //optional
  "category": "program", //optional
  "subcategory": "hutan-dan-iklim", //optional
  "description": "Lorem ipsum 2", //optional
  "tags": ["tag1", "tags2"], //optional
  "file": null, //optional
  "linkFile": "https://somefiles.com", //optional
  "year": 2012, //optional
  "relatedProgram": null //optional
}
```

Response Body Success :

```json
{
  "success": true,
  "message": "Update Report Successfully",
  "data": {
    "id": 2,
    "title": "This is new Title 2",
    "category": "program",
    "subcategory": "hutan-dan-iklim",
    "description": "Lorem ipsum 2",
    "tags": ["tag1", "tags2"],
    "file": null,
    "linkFile": "https://somefiles.com",
    "year": "2012",
    "relatedProgram": null,
    "createdUser": "fadidajunaedy",
    "createdAt": "2023-12-23T14:56:19.000Z",
    "updatedAt": "2023-12-24T00:12:43.116Z"
  }
}
```

Response Body Error :

```json
{
  "errors": "Report is not found"
}
```

## Delete Report API

Endpoint : DELETE /api/reports/:id

Request Cookies :

- accessToken : unique-token

Response Body Success :

```json
{
  "success": true,
  "message": "Deleted Report Successfully"
}
```

Response Body Error :

```json
{
  "errors": "Report is not found"
}
```
