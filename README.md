# Event Registration Platform

A full-stack Event Registration Platform built with React, Node.js, Express, Prisma, and PostgreSQL. The platform allows organizers to create and manage events while participants can discover events, register, submit payments, and verify entry using OTP-based authentication.

---

# Features

## Authentication & Authorization

* User Registration
* Email Verification using OTP
* Secure Login with JWT
* Forgot Password with OTP
* Reset Password
* Role-Based Access Control
* Organizer Role
* Participant Role

---

## Event Management

### Organizer Features

* Create Event
* Update Event
* Delete Event
* Upload Event Banner using Cloudinary
* Manage Event Capacity
* Manage Event Details
* View Event Registrations

### Participant Features

* Browse Events
* Search Events
* View Event Details
* Register for Events

---

## Registration System

* Event Registration
* Duplicate Registration Prevention
* Capacity Validation
* Registration Status Tracking

Registration statuses:

* PAYMENT_PENDING
* PAYMENT_SUBMITTED
* CONFIRMED
* REJECTED
* CANCELLED

---

## Payment Verification

Participants can submit:

* UTR ID
* Transaction ID
* Payment Amount

Organizers can:

* Approve Payment
* Reject Payment
* Add Rejection Reason

Payment verification is manually reviewed by organizers.

---

## OTP-Based Entry Verification

Organizers can:

* Send Entry OTP
* Verify Entry OTP

Participants receive OTP via email before event entry.

Entry statuses:

* NOT_ARRIVED
* ALLOWED
* REJECTED

---

## Dashboard System

### Organizer Dashboard

* Total Events
* Total Registrations
* Pending Payments
* Confirmed Registrations
* Entry Verification Statistics

### Participant Dashboard

* Registered Events
* Pending Payments
* Confirmed Events
* Entry Status
* Registration Statistics

---

## AI Chatbot

Integrated FAQ and Help Chatbot for:

### Participants

* Registration Queries
* Payment Queries
* Event Queries
* OTP Queries

### Organizers

* Event Management Queries
* Payment Verification Queries
* Registration Queries

Powered by Groq LLM.

---

# Tech Stack

## Frontend

* React
* React Router DOM
* Axios
* Tailwind CSS
* Lucide React
* React Hot Toast

## Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Nodemailer
* Cloudinary
* Multer

## Database

* PostgreSQL

## File Storage

* Cloudinary

## AI

* Groq API

---

# Architecture

## Roles

### Organizer

Can:

* Create Events
* Update Events
* Delete Events
* Manage Registrations
* Verify Payments
* Verify Entry OTPs

### Participant

Can:

* Browse Events
* Register for Events
* Submit Payments
* Verify Event Entry

---

# Project Structure

## Frontend

```txt
src
├── api
├── components
├── context
├── pages
│   ├── auth
│   ├── organizer
│   └── participant
├── routes
├── utils
└── App.jsx
```

## Backend

```txt
backend
├── config
├── controllers
├── middleware
├── routes
├── services
├── utils
├── prisma
└── server.js
```

---

# Database Models

## User

* id
* name
* email
* password
* role
* isVerified

## Event

* title
* description
* venue
* category
* startTime
* endTime
* maxCapacity
* bannerPublicId
* upiId

## Registration

* participantId
* eventId
* registrationStatus
* entryStatus

## ManualPayment

* utrId
* transactionId
* amount
* status

## Otp

* email
* otp
* type
* expiresAt

## EntryLog

* registrationId
* verifiedById
* otp
* status

---

# API Modules

## Authentication

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/verify-email
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

## Events

```txt
POST /api/events
GET /api/events
GET /api/events/:id
PUT /api/events/:id
DELETE /api/events/:id
GET /api/events/my-events
```

## Registrations

```txt
POST /api/registrations/:eventId/register
GET /api/registrations/my-registrations
GET /api/registrations/event/:eventId/registrations
```

## Payments

```txt
POST /api/payments/:registrationId/submit
PATCH /api/payments/:paymentId/approve
PATCH /api/payments/:paymentId/reject
GET /api/payments/pending
```

## Entry Verification

```txt
POST /api/entry/:registrationId/send-otp
POST /api/entry/:registrationId/verify
```

## Dashboard

```txt
GET /api/dashboard/participant
GET /api/dashboard/organizer
```

## Chatbot

```txt
POST /api/chatbot/ask
```

---

# Environment Variables

## Backend

```env
PORT=3000

DATABASE_URL=

JWT_SECRET=
JWT_EXPIRES_IN=3d

EMAIL_USER=
EMAIL_PASS=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

GROQ_API_KEY=
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

## Backend

```bash
cd backend

npm install

npx prisma generate

npx prisma db push

npm run dev
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Security Features

* JWT Authentication
* Password Hashing using bcrypt
* OTP Verification
* Role-Based Authorization
* Input Validation
* Protected Routes
* Secure File Uploads

---

# Future Enhancements

* QR Code Entry Verification
* Event Analytics
* Real-Time Notifications
* Payment Gateway Integration
* Event Feedback System
* Attendance Reports
* Admin Dashboard

---

# Author

Kavin Prakash

Full Stack Developer

Built using React, Node.js, Express, Prisma, PostgreSQL, Cloudinary, and Groq AI.
