# event-registration-platform

# OTP-Based Event Registration and Entry Verification System

## Overview

The OTP-Based Event Registration and Entry Verification System is a full-stack web application that allows organizers to create and manage events while enabling participants to register, verify payments, and gain entry through OTP-based verification.

The platform focuses on secure event management, manual UPI payment verification, participant validation, and automated event entry control.

---

## Features

### Participant Features

* User Registration
* Email Verification using OTP
* Login & Authentication
* Forgot Password using OTP
* Browse Events
* Search Events
* View Event Details
* Register for Events
* Submit UPI Transaction ID & UTR ID
* View Registration Status
* Receive Event Entry OTP
* View Registered Events

### Organizer Features

* Organizer Registration
* Email Verification using OTP
* Login & Authentication
* Forgot Password using OTP
* Create Events
* Update Events
* Delete Events
* Upload Event Banner
* Manage Event Capacity
* View Registrations
* Verify UPI Payments
* Approve / Reject Registrations
* Send Event Entry OTP Automatically
* Send Event Entry OTP Manually
* Verify Participant Entry OTP
* View Event Statistics

---

## Event Registration Flow

1. Participant creates an account.
2. Email verification OTP is sent.
3. Participant verifies email.
4. Participant browses available events.
5. Participant registers for an event.
6. Participant makes payment using organizer's UPI QR.
7. Participant submits:

   * Transaction ID
   * UTR ID
8. Registration status becomes **Pending Verification**.
9. Organizer verifies payment.
10. Registration becomes **Confirmed**.

---

## Event Entry Flow

1. Event Entry OTP is sent before the event.
2. Participant arrives at the venue.
3. Participant provides OTP.
4. Organizer verifies OTP.
5. Entry status becomes **Allowed**.

---

## OTP Workflows

### Email Verification OTP

Used during account creation.

### Forgot Password OTP

Used to reset forgotten passwords.

### Event Entry OTP

Used as a digital event pass for entry verification.

---

## Event Capacity Management

Each event has a maximum capacity of **60 participants**.

Registration is automatically closed when the capacity limit is reached.

---

## Payment Verification

The system uses manual UPI payment verification.

Participants submit:

* Transaction ID
* UTR ID

Organizers verify payments manually and approve or reject registrations.

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router DOM
* Axios
* React Hot Toast
* Lucide React

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Neon Database

### ORM

* Prisma ORM

### Authentication

* JWT Authentication
* Email OTP Verification

### File Storage

* Cloudinary
* Event Banner Upload

### Email Service

* Nodemailer

### Scheduled Tasks

* Node Cron

### Deployment

**Frontend**

* Vercel

**Backend**

* Render

**Database**

* Neon PostgreSQL

---

## Backend Structure

```text
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── jobs/
│   ├── utils/
│   ├── app.js
│   └── server.js
└── .env
```

## Frontend Structure

```text
frontend/
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   │   ├── auth/
│   │   ├── participant/
│   │   └── organizer/
│   ├── context/
│   ├── layouts/
│   ├── routes/
│   ├── App.jsx
│   └── main.jsx
```

---

## Environment Variables

```env
DATABASE_URL=

JWT_SECRET=

EMAIL_USER=
EMAIL_PASS=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Future Enhancements

* AI Student Support Chatbot
* SMS OTP Integration
* Attendance Analytics
* Certificate Generation
* Event Feedback System
* Organizer Reports Export
* Real-Time Notifications
* Mobile Application

---

## Author

Developed using:

* React
* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* Tailwind CSS
* Cloudinary
* JWT Authentication

A modern full-stack event management solution with secure OTP-based participant verification.
