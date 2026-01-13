# How to Start the Backend Server

## Quick Start Instructions

**IMPORTANT:** You need to run the backend server in a separate terminal window for the form to work.

### Step 1: Open a Terminal/Command Prompt

Open a new terminal window (keep your frontend running in the other terminal).

### Step 2: Navigate to Server Directory

```powershell
cd kaarigar-homepage-design\server
```

### Step 3: Check if .env file exists

The `.env` file should be in the `server` directory. If it doesn't exist, create it with this content:

```
MONGODB_URI=mongodb+srv://karigarcustomercare_db_user:Z9sPXUkvoNbNppyA@cluster0.pmgt5l5.mongodb.net/
PORT=3001
```

### Step 4: Install Dependencies (if not done already)

```powershell
npm install
```

### Step 5: Start the Server

```powershell
npm start
```

You should see:
```
Connected to MongoDB successfully
Server is running on port 3001
```

### Step 6: Keep the Server Running

**Keep this terminal window open** while using the registration form. The server needs to be running for the form to submit data to MongoDB.

---

## Troubleshooting

### If you see "Cannot find module" errors:
- Make sure you ran `npm install` in the server directory
- Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

### If you see MongoDB connection errors:
- Check your internet connection
- Verify the MongoDB connection string is correct in the `.env` file

### If port 3001 is already in use:
- Change the PORT in `.env` file to a different port (e.g., 3002)
- Update the API URL in `src/pages/WorkerRegistration.tsx` to match the new port

### To stop the server:
- Press `Ctrl + C` in the terminal where the server is running


