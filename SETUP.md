# Setup Instructions for MongoDB Integration

## Backend Server Setup

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in the `server` directory:**
   
   Create a file named `.env` in the `server` folder with the following content:
   ```
   MONGODB_URI=mongodb+srv://karigarcustomercare_db_user:Z9sPXUkvoNbNppyA@cluster0.pmgt5l5.mongodb.net/
   PORT=3001
   ```

   **Note:** If you don't create the `.env` file, the server will use the MongoDB connection string from the code (which is already configured).

4. **Start the backend server:**
   ```bash
   npm start
   ```

   The server will run on port 3001.

## Frontend Setup

1. **Navigate to the project root (if not already there):**
   ```bash
   cd kaarigar-homepage-design
   ```

2. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on port 8080 (default).

## What's Changed

1. **New Backend Server:**
   - Created Express server in `/server` directory
   - MongoDB connection using the provided connection string
   - API endpoint: `POST /api/workers/register` to save worker registrations
   - Data is stored in MongoDB database `kaarigar`, collection `workers`

2. **Updated Registration Form:**
   - Added "Per Day Charges" field (required)
   - Form now submits data to the backend API
   - Added loading state and error handling
   - Form data includes: name, phone, email, service, location, experience, perDayCharges, description

3. **Database Schema:**
   - Workers are stored with the following fields:
     - name (string)
     - phone (string)
     - email (string)
     - service (string)
     - location (string)
     - experience (string, optional)
     - perDayCharges (number)
     - description (string, optional)
     - createdAt (Date, automatically added)
     - status (string, defaults to "pending")

## Testing

1. Start the backend server first (port 3001)
2. Start the frontend server (port 8080)
3. Navigate to the registration page and fill out the form
4. Submit the form - data will be saved to MongoDB
5. Check MongoDB Atlas to verify the data is stored


