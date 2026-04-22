# Visiting Card Website Documentation

Digital visiting card web app built with React + Vite, with a PHP API endpoint that generates downloadable vCard (`.vcf`) files.

## 1) Project Overview

This application provides:

- A **contacts listing page** (`/`) that loads all contacts from JSON.
- A **contact detail page** (`/contact/:id`) that displays click-to-call/email/social links.
- A **Save Contact** action that opens a PHP endpoint and downloads a standards-compatible `.vcf` file.

Core stack:

- Frontend: React 19, TypeScript, React Router, Vite
- Backend API (single endpoint): PHP (`public/contact.php`)
- Data store: static JSON (`public/data.json`)
- Assets: static images under `public/images/`

---

## 2) Folder Structure

Key files and directories:

- `src/main.tsx` - React app bootstrap.
- `src/App.tsx` - Route setup.
- `src/pages/HomePage.tsx` - Contact list page.
- `src/pages/ContactPage.tsx` - Single contact view + Save Contact button.
- `src/api/contacts.ts` - Contact loading, runtime validation, PHP download URL builder.
- `src/types/contact.ts` - TypeScript contract for contact records.
- `src/lib/contactDetails.ts` - UI detail row generation and link formatting.
- `public/data.json` - Contact source of truth.
- `public/contact.php` - PHP API endpoint to generate vCard download.
- `public/images/` - Profile pictures referenced by `data.json`.

---

## 3) Frontend Flow

### 3.1 Routes

Defined in `src/App.tsx`:

- `/` -> `HomePage`
- `/contact/:id` -> `ContactPage`

### 3.2 Contact Data Loading

`loadContacts()` in `src/api/contacts.ts`:

- Fetches `/data.json`
- Validates each record at runtime using `isContactRecord`
- Caches successful response in memory (`cached`) to avoid repeat fetches
- Shares in-flight fetch via `pending` promise to prevent duplicate concurrent requests

### 3.3 Save Contact Action

`ContactPage` calls:

- `contactPhpDownloadUrl(id)` -> returns endpoint URL with `?id=<uuid>`
- `window.open(url, "_blank", "noopener,noreferrer")` to trigger file download

If `VITE_CONTACT_PHP_URL` is set, it is used as API base.
If not set, a default URL is used from code.

---

## 4) Contact Data Contract (`public/data.json`)

Each contact object includes:

Required fields:

- `id` (UUID string)
- `name`
- `phone`
- `email`
- `company`
- `title`
- `image` (relative path, e.g. `images/user1.jpg`)

Optional fields:

- `phone_work`
- `linkedin`
- `linkedin_display`
- `website`
- `website_display`

Example:

```json
{
  "id": "a0c89ccf-5f71-4fb8-b4c5-92a6f86ab001",
  "name": "Vaanathi Mohanakrishnan",
  "phone": "+971 52 411 1981",
  "email": "vaanathi@finartha.ai",
  "company": "Finartha Technology Solutions (FTS)",
  "title": "Founder - Chief Executive Officer",
  "image": "images/user1.jpg",
  "linkedin": "https://www.linkedin.com/company/finartha-technology-solutions/",
  "linkedin_display": "linkedin.com/company/finartha-technology-solutions",
  "website": "https://finartha.ai/",
  "website_display": "finartha.ai"
}
```

---

## 5) PHP API Documentation (`public/contact.php`)

### 5.1 Endpoint

- **Method:** `GET`
- **Path:** `/contact.php`
- **Query Param:** `id=<uuid>`
- **Purpose:** Generates and downloads a vCard 3.0 file for the specified contact.

Example:

```txt
/contact.php?id=a0c89ccf-5f71-4fb8-b4c5-92a6f86ab001
```

### 5.2 Request Validation

The endpoint validates:

- `id` must be a valid UUID (regex checked)
- `public/data.json` must exist and be readable
- JSON must decode into an array
- Contact with matching `id` must exist
- Contact must contain a non-empty `name`

### 5.3 Response

Success response:

- **Status:** `200 OK`
- **Headers:**
  - `Content-Type: text/vcard; charset=utf-8`
  - `Content-Disposition: attachment; filename="<name>.vcf"`
  - `Content-Length: <bytes>`
- **Body:** vCard 3.0 content with CRLF line endings

Error responses:

- `400` -> `Invalid id`
- `404` -> `Contact not found`
- `422` -> `Contact has no name`
- `500` -> `Contact data unavailable` or `Invalid contact data`

### 5.4 vCard Fields Generated

The endpoint creates:

- `BEGIN:VCARD`
- `VERSION:3.0`
- `FN`
- `N`
- `UID` (`vcard-<uuid>`)
- `EMAIL`
- `TEL;TYPE=CELL`
- Optional `TEL;TYPE=WORK`
- `ORG`
- `TITLE`
- `URL` (contact website if available, otherwise endpoint URL)
- Optional `X-SOCIALPROFILE;TYPE=linkedin`
- `NOTE` (currently fixed string)
- `PHOTO` (embedded base64 JPEG when possible, otherwise URI)
- `END:VCARD`

### 5.5 Image Handling for PHOTO

Behavior:

1. Reads image path from `image` field in JSON.
2. Prevents path traversal (`..` rejected).
3. Confirms resolved file is inside `public/`.
4. Attempts compression via GD:
   - Supports JPEG and PNG input
   - Resizes down to max width 300px
   - Re-encodes JPEG quality 60
5. If compressed payload <= 50 KB, embeds base64 PHOTO in vCard.
6. If not embeddable, falls back to absolute image URL (`VALUE=uri`).

PHP requirements for this behavior:

- PHP 8+ recommended
- GD extension enabled (`imagecreatefromjpeg`, `imagecreatefrompng`, `imagejpeg`)

---

## 6) Local Development

### 6.1 Prerequisites

- Node.js 18+ (recommended)
- npm (or yarn)
- PHP (for API endpoint testing)
- Web server capable of serving `public/contact.php`

### 6.2 Install Dependencies

```bash
npm install
```

### 6.3 Run Frontend

```bash
npm run dev
```

Default Vite dev server uses host mode (`vite --host`) so it is reachable on LAN too.

### 6.4 Build Frontend

```bash
npm run build
```

### 6.5 Preview Production Build

```bash
npm run preview
```

---

## 7) Environment Configuration

Frontend uses:

- `VITE_CONTACT_PHP_URL` (optional)

Purpose:

- Base URL for PHP download endpoint used by `contactPhpDownloadUrl(id)`.

Example:

```env
VITE_CONTACT_PHP_URL=https://your-domain.com/contact.php
```

Notes:

- Query param `id` is appended automatically.
- If omitted, code fallback URL is used.

---

## 8) Deployment Notes

You can deploy frontend and PHP in one server root where:

- Static assets are served from `public/`
- `contact.php` is executable through PHP runtime
- `data.json` and `images/` are readable by web server

Recommended checks after deployment:

1. Open `/` and verify contacts load.
2. Open `/contact/<uuid>` and verify detail links.
3. Click **Save Contact** and ensure `.vcf` downloads.
4. Import downloaded `.vcf` on iOS/Android and verify fields + photo.

---

## 9) Security and Reliability Notes

Current safeguards in PHP endpoint:

- Strict UUID validation
- Input normalization (`trim`, lowercase)
- Path traversal protection for image file access
- Readability checks for data file
- Graceful HTTP status codes on invalid states
- `X-Content-Type-Options: nosniff` response header

Potential improvements (optional):

- Add request rate limiting at server/proxy level
- Add structured logging for API errors
- Add unit/integration tests for vCard generation
- Make note text configurable per environment

---

## 10) Troubleshooting

### Contacts not loading on frontend

- Verify `public/data.json` is valid JSON array.
- Check browser devtools network for `/data.json` status.
- Ensure all required contact fields are present and are strings.

### Save Contact opens wrong server

- Set `VITE_CONTACT_PHP_URL` correctly in environment.
- Rebuild/restart frontend after env changes.

### Download works but no photo in contact app

- Confirm server can access image files under `public/images/`.
- Ensure PHP GD extension is enabled.
- Some contact apps may ignore specific vCard PHOTO formats; test on target devices.

### PHP returns 500

- Verify `public/data.json` is readable and valid.
- Check PHP error logs for GD/image function failures.

---

## 11) API Quick Reference

- `GET /contact.php?id=<uuid>`
  - 200: returns `.vcf` file
  - 400: invalid UUID
  - 404: no matching contact
  - 422: contact name missing
  - 500: data source/read/parse errors
