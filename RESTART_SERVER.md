# Server Restart Required

## The Problem
You're getting a 404 error because the backend server is running **old code** that doesn't have the `/api/workers` endpoint.

## Solution: Restart the Server

### Step 1: Stop the Current Server
1. Find the terminal window where the server is running (showing "Server is running on port 3001")
2. Press `Ctrl + C` to stop the server

### Step 2: Start the Server Again
In the same terminal (or a new one), navigate to the server directory and start it:

```powershell
cd kaarigar-homepage-design\server
npm start
```

You should see:
```
Connected to MongoDB successfully
Server is running on port 3001
```

### Step 3: Verify the Route Works
The new code includes:
- `GET /api/workers` - to fetch workers
- `GET /api/workers?service=carpenter` - to fetch workers by service type

### Step 4: Test in Browser
After restarting, try accessing:
- http://localhost:3001/api/health (should return JSON)
- http://localhost:3001/api/workers (should return JSON with workers array)

---

**Important:** The server must be restarted after any code changes to the `server/index.js` file!


