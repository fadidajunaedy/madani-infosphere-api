# Tag API Spec

## Get All Tag API

Endpoint : GET /api/tags

Request Cookies :

- accessToken : unique-token

Response Body Success :

```json
{
  "success": true,
  "message": "Get Tags Successfully",
  "data": [
    {
      "id": 1,
      "title": "Peduli Hutan Jakarta"
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

## Get Tag API

Endpoint : GET /api/tags/:id

Request Cookies :

- accessToken : unique-token

Response Body Success :

```json
{
  "success": true,
  "message": "Get Tag Successfully",
  "data": {
    "id": 1,
    "title": "Peduli Hutan Jakarta"
  }
}
```

Response Body Error :

```json
{
  "errors": "Tag is not found"
}
```

## Create Tag API

Endpoint : POST /api/tags

Request Cookies :

- accessToken : unique-token

Request Body Success :

```json
{
  "title": "Peduli Hutan Jakarta"
}
```

Response Body Success :

```json
{
  "success": true,
  "message": "Create Tag Successfully",
  "data": {
    "id": 1,
    "title": "Peduli Hutan Jakarta"
  }
}
```

Response Body Error :

```json
{
  "errors": "Tag is already exist"
}
```

## Update Tag API

Endpoint : PATCH /api/tags/:id

Request Cookies :

- accessToken : unique-token

Request Body Success :

```json
{
  "title": "Peduli Hutan Jakarta 2"
}
```

Response Body Success :

```json
{
  "success": true,
  "message": "Updated Tag Successfully",
  "data": {
    "id": 1,
    "title": "Peduli Hutan Jakarta 2"
  }
}
```

Response Body Error :

```json
{
  "errors": "Tag is not found"
}
```

## Delete Tag API

Endpoint : DELETE /api/tags/:id

Request Cookies :

- accessToken : unique-token

Response Body Success :

```json
{
  "success": true,
  "message": "Deleted Tag Successfully"
}
```

Response Body Error :

```json
{
  "errors": "Tag is not found"
}
```
