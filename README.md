# Email Notification System

## Description

An email notification system built with Node.js and MongoDB/MySQL that allows users to send emails, track their status, and receive real-time updates using Socket.io.

## Features

- Compose and send emails
- Asynchronous email processing using Bull queue
- Email status tracking (pending, sent, failed)
- Real-time notifications with Socket.io
- Error handling with custom ApiError and ApiResponse classes

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB or MySQL
- **Email Service**: SendGrid
- **Queue System**: Bull
- **Real-Time Communication**: Socket.io
- **Environment Variables**: dotenv

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
    cd backend

   ```

2. Install dependencies
   npm i
   3.Create a .env file in the root directory and add the following environment variables:
   PORT=your_port_number
   MONGODB_URI=your_mongodb_uri
   CORS_ORIGIN=your_cors_origin
   SENDGRID_API_KEY=your_sendgrid_api_key
   REDIS_URL=your_redis_url
   SENDGRID_FROM=your_sendgrid_from_email

4.Start the server:
npm run dev

## Example Requests

### 1. Send Email

**Endpoint**: `POST /api/v1/emails/send`

**Request Body**:

````json
{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "body": "This is a test email."
}

**Example Response**:
```json
{
  "statusCode": 201,
  "data": {
    "emailId": "643d13cda5dcd123456789ab"
  },
  "message": "Email queued for sending",
  "success": true
}

### 2. Get Email Status
**Endpoint**: `GET /api/v1/emails/:emailId/status`

**Description**: Replace `:emailId` with the actual email ID to get the status of the email.

**Example Request**:
**Example Response**:
```json
{
  "status": "sent",
  "message": "Email status retrieved successfully",
  "data": {
    "status": "sent"
  }
}

 # Real-Time Notifications
Connect to the WebSocket server to receive real-time email status updates. The status will be emitted as soon as the email is either sent or failed.



````
