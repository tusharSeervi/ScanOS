# ScanOS Intake Queue

A full-stack patient intake queue application built with Django REST Framework and Next.js. The application allows staff to browse patient intake submissions, review submission details, and manage the intake queue through filtering, sorting, and pagination.

The backend exposes a REST API with validated business rules, while the frontend provides a responsive interface for viewing patient submissions.

---

## Features

### Backend

- REST API for patient intake submissions
- Paginated submission listing
- Retrieve individual submissions
- Filter submissions by status
- Sort submissions by supported fields
- Server-side pagination
- Business rule validation for status transitions
- Seed command for loading sample data

### Frontend

- Intake queue table
- Submission detail page
- Status badges
- Status filtering
- Sorting
- Pagination
- Loading states
- Error states
- Dynamic routing for submission details

---

## Tech Stack

### Backend

- Python
- Django
- Django REST Framework
- SQLite
- django-filter

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- TanStack React Query
- Axios
- shadcn/ui

---

## Project Structure

```text
backend/
├── submissions/
├── config/
├── manage.py
└── requirements.txt

frontend/
├── app/
├── components/
├── hooks/
├── services/
├── types/
├── lib/
└── package.json
```

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm

---

### Backend Setup

```bash
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt
```

---

### Database Migration

```bash
python manage.py migrate
```

---

### Load Sample Data

```bash
python manage.py seed_submissions
```

---

### Run Backend

```bash
python manage.py runserver
```

Backend will be available at:

```
http://127.0.0.1:8000/
```

---

### Frontend Setup

```bash
cd frontend

npm install
```

---

### Run Frontend

```bash
npm run dev
```

Frontend will be available at:

```
http://localhost:3000
```

---

## API Endpoints

| Method | Route | Description |
|---------|-------|-------------|
| GET | `/api/submissions/` | Returns paginated submissions |
| GET | `/api/submissions/<id>/` | Returns a single submission |
| PATCH | `/api/submissions/<id>/` | Updates a submission status with transition validation |

---

## Filtering

The submission list supports the following query parameters:

| Parameter | Description |
|------------|-------------|
| `status` | Filter submissions by status |
| `ordering` | Sort the results |
| `page` | Navigate paginated results |

Example:

```
GET /api/submissions/?status=new&ordering=-created_at&page=2
```

---

## Ordering

Supported ordering fields:

- `created_at`
- `patient_name`
- `age`

Ascending:

```
ordering=patient_name
```

Descending:

```
ordering=-created_at
```

---

## Pagination

Submission listings return Django REST Framework's paginated response:

```json
{
  "count": 15,
  "next": "...",
  "previous": null,
  "results": []
}
```

---

## Status Workflow

Allowed submission status transitions:

```text
NEW
  │
  ▼
IN_REVIEW
 ├──────────────┐
 ▼              ▼
APPROVED    REJECTED
```

The backend enforces these transition rules through the service layer.

Invalid transitions are rejected with a validation error.

---

## Screenshots

### Queue View

> _Add screenshot here._

### Submission Detail

> _Add screenshot here._

---

## Engineering Decisions

### Service Layer

Business rules for submission status transitions are centralized in a dedicated service layer to keep views lightweight and ensure validation remains reusable.

### Generic Views

Django REST Framework generic views are used to reduce boilerplate while keeping the API implementation clear and maintainable.

### React Query

TanStack React Query manages server state, request caching, and loading/error handling for API interactions.

### Reusable Components

The frontend is organized into reusable UI components, including tables, filters, badges, and pagination controls.

### Dynamic Routing

Next.js App Router dynamic routes (`/submissions/[id]`) are used for submission detail pages.

---

## Future Improvements

- Submission status update controls in the frontend
- Search by patient name
- Optimistic UI updates
- Automated tests
- Authentication and authorization
- Docker support
- Production deployment configuration

---

## Notes

- The frontend consumes the Django REST Framework API exposed by the backend.
- Sample submissions can be loaded using the provided Django management command.
- The backend enforces submission status transition rules independently of the frontend to maintain data integrity.
