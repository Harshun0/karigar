# Kaarigar Backend Server

This is the backend server for the Kaarigar worker registration system.

## Setup Instructions

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (if not already created) with the following content:
   ```
   MONGODB_URI=mongodb+srv://karigarcustomercare_db_user:Z9sPXUkvoNbNppyA@cluster0.pmgt5l5.mongodb.net/
   PORT=3001
   ```

4. Start the server:
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

The server will run on port 3001 by default.

## API Endpoints

### POST /api/workers/register
Register a new worker.

**Request Body:**
```json
{
  "name": "string",
  "phone": "string",
  "email": "string",
  "service": "string",
  "location": "string",
  "experience": "string",
  "perDayCharges": "number",
  "description": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Worker registered successfully",
  "id": "mongodb_id"
}
```

### GET /api/health
Health check endpoint to verify server is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Database

The server connects to MongoDB Atlas and stores worker registrations in the `kaarigar` database under the `workers` collection.


