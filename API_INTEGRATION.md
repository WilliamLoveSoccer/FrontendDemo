# API Integration Guide

Base URL: `http://localhost:<port>`  
All requests and responses use **JSON**. Set the `Content-Type: application/json` header on all POST requests.

---

## Error format

All error responses share the same shape:

```json
{ "error": "Human-readable message." }
```

| Status | Meaning |
|--------|---------|
| `400` | Validation failed or bad input |
| `404` | Resource not found |
| `500` | Unexpected server error |

---

## Groups

### List all groups

```
GET /v1/groups
```

**Response `200`**

```json
[
  { "id": 1, "name": "Engineering" },
  { "id": 2, "name": "Marketing" }
]
```

---

### Create a group

```
POST /v1/groups
```

**Request body**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | Yes | Name of the group |

```json
{ "name": "Engineering" }
```

**Response `201`**

```json
{ "id": 1, "name": "Engineering" }
```

---

## Alerts

### Create an alert

```
POST /v1/alerts
```

**Request body**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | Yes | Alert title |
| `body` | string | No | Alert message body |
| `createdBy` | string | No | Author identifier |
| `groupIds` | number[] | Yes | At least one group ID must be provided |

```json
{
  "title": "Scheduled maintenance tonight",
  "body": "The system will be down from 11pm–1am.",
  "createdBy": "jane.doe",
  "groupIds": [1, 2]
}
```

**Response `201`**

```json
{
  "id": 42,
  "title": "Scheduled maintenance tonight",
  "createdAt": "2026-04-19T10:30:00Z",
  "createdBy": "jane.doe"
}
```

**Error `400`** — if `groupIds` is empty or a referenced group does not exist.

---

### List alerts (paginated)

```
GET /v1/alerts?page=1&pageSize=10
```

**Query parameters**

| Parameter | Type | Default | Constraints |
|-----------|------|---------|-------------|
| `page` | number | `1` | Must be ≥ 1 |
| `pageSize` | number | `10` | Between 1 and 100 |

**Response `200`**

```json
{
  "items": [
    {
      "id": 42,
      "title": "Scheduled maintenance tonight",
      "createdBy": "jane.doe",
      "createdAt": "2026-04-19T10:30:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "pageSize": 10
}
```

Use `total` and `pageSize` to calculate the number of pages: `Math.ceil(total / pageSize)`.

---

### Get alert delivery status

```
GET /v1/alerts/:id/status
```

**Response `200`**

```json
{
  "totalRecipients": 50,
  "sentCount": 42,
  "failedCount": 3,
  "pendingCount": 5
}
```

**Error `404`** — if no alert exists with the given `id`.

---

## Typical integration flow

1. **Fetch available groups** — `GET /v1/groups` — populate a group selector in your UI.
2. **Create an alert** — `POST /v1/alerts` with the selected `groupIds`.
3. **Poll for delivery status** — `GET /v1/alerts/:id/status` until `pendingCount` reaches `0`.
