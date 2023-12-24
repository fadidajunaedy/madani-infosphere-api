# Event API Spec

## Get All Event API

Endpoint : GET /api/events

Request Cookies :

- accessToken : unique-token

Response Body Success :

```json
{
  "success": true,
  "message": "Get Event Successfully",
  "data": [
    {
      "id": 1,
      "title": "Event Peduli Lingkungan",
      "description": "Lorem ipsum",
      "theme": "public-event",
      "startDate": "2023-03-24",
      "startTime": "10:00",
      "endDate": "2023-03-30",
      "endTime": "12:00",
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

Endpoint : GET /api/events/:id

Request Cookies :

- accessToken : unique-token

Response Body Success :

```json
{
  "success": true,
  "message": "Get Tag Successfully",
  "data": {
    "id": 1,
    "title": "Event Peduli Lingkungan",
    "description": "Lorem ipsum",
    "theme": "public-event",
    "startDate": "2023-03-24",
    "startTime": "10:00",
    "endDate": "2023-03-30",
    "endTime": "12:00"
  }
}
```

Response Body Error :

```json
{
  "errors": "Event is not found"
}
```

## Create Event API

Endpoint : POST /api/events

Request Cookies :

- accessToken : unique-token

Request Body Success :

```json
{
  "title": "Event Peduli Lingkungan",
  "description": "Lorem ipsum",
  "theme": "public-event",
  "startDate": "2023-03-24",
  "startTime": "10:00",
  "endDate": "2023-03-30",
  "endTime": "12:00"
}
```

Response Body Success :

```json
{
  "success": true,
  "message": "Create Event Successfully",
  "data": {
    "id": 1,
    "title": "Event Peduli Lingkungan",
    "description": "Lorem ipsum",
    "theme": "public-event",
    "startDate": "2023-03-24",
    "startTime": "10:00",
    "endDate": "2023-03-30",
    "endTime": "12:00"
  }
}
```

Response Body Error :

```json
{
  "errors": "startDate format is incorrect"
}
```

## Update Event API

Endpoint : PATCH /api/events/:id

Request Cookies :

- accessToken : unique-token

Request Body Success :

```json
{
  "title": "Event Peduli Lingkungan Hidup", // optional
  "description": "Lorem ipsum", // optional
  "theme": "private-event", // optional
  "startDate": "2023-03-24", // optional
  "startTime": "10:00", // optional
  "endDate": "2023-03-30", // optional
  "endTime": "12:00" // optional
}
```

Response Body Success :

```json
{
  "success": true,
  "message": "Updated Event Successfully",
  "data": {
    "id": 1,
    "title": "Event Peduli Lingkungan Hidup",
    "description": "Lorem ipsum",
    "theme": "private-event",
    "startDate": "2023-03-24",
    "startTime": "10:00",
    "endDate": "2023-03-30",
    "endTime": "12:00"
  }
}
```

Response Body Error :

```json
{
  "errors": "Event is not found"
}
```

## Delete Event API

Endpoint : DELETE /api/events/:id

Request Cookies :

- accessToken : unique-token

Response Body Success :

```json
{
  "success": true,
  "message": "Deleted Event Successfully"
}
```

Response Body Error :

```json
{
  "errors": "Event is not found"
}
```
