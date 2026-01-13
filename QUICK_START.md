# Quick Start Guide - Backend Server

## ⚠️ IMPORTANT: The Backend Server MUST Be Running

The error `ERR_CONNECTION_REFUSED` means the backend server is not running on port 3001.

## Step-by-Step Instructions

### 1. Open a NEW Terminal Window
   - Keep your frontend running in one terminal
   - Open a **second terminal window** for the backend

### 2. Navigate to Server Directory

In the NEW terminal, run:
```powershell
cd kaarigar-homepage-design\server
```

### 3. Verify .env File Exists

Check if `.env` file exists:
```powershell
dir .env
```

If it doesn't exist, create it manually:
- Create a new file named `.env` (no extension, just `.env`)
- In the `server` folder
- Add this content:
```
MONGODB_URI=mongodb+srv://karigarcustomercare_db_user:Z9sPXUkvoNbNppyA@cluster0.pmgt5l5.mongodb.net/
PORT=3001
```

### 4. Install Dependencies (if not done)

```powershell
npm install
```

Wait for installation to complete.

### 5. Start the Backend Server

```powershell
npm start
```

You should see output like:
```
Connected to MongoDB successfully
Server is running on port 3001
```

### 6. Keep Terminal Open

**DO NOT CLOSE THIS TERMINAL** - the server must keep running for the form to work.

### 7. Test the Form

Now go back to your browser and try submitting the registration form. It should work!

---

## Troubleshooting

### If you see "Cannot find module" errors:
```powershell
cd kaarigar-homepage-design\server
rmdir /s /q node_modules
del package-lock.json
npm install
npm start
```

### If port 3001 is already in use:
1. Find what's using the port:
   ```powershell
   netstat -ano | findstr :3001
   ```
2. Or change the port in `.env` file to 3002
3. Update the API URL in `src/pages/WorkerRegistration.tsx` line 60 to use port 3002

### If MongoDB connection fails:
- Check your internet connection
- Verify the MongoDB connection string is correct
- Make sure there are no extra spaces in the `.env` file

---

## Summary

**You need TWO terminal windows running:**
1. **Terminal 1:** Frontend (already running) - `npm run dev`
2. **Terminal 2:** Backend (you need to start this) - `cd server` then `npm start`

Both must be running simultaneously!


