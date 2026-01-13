# Deployment Guide for Kaarigar Homepage

## GitHub Setup

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

## Vercel Deployment

### Frontend + Backend (Serverless) Deployment

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "Add New..." → "Project"
   - Import your GitHub repository

2. **Configure Environment Variables:**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add `MONGODB_URI` with your MongoDB connection string
   - Example: `mongodb+srv://karigarcustomercare_db_user:Z9sPXUkvoNbNppyA@cluster0.pmgt5l5.mongodb.net/`

3. **Build Settings:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically detect the `vercel.json` configuration
   - Your API routes will be deployed as serverless functions

### API Endpoints Structure

After deployment, your API endpoints will be available at:
- `https://your-domain.vercel.app/api/workers/register`
- `https://your-domain.vercel.app/api/workers`
- `https://your-domain.vercel.app/api/auth/register`
- `https://your-domain.vercel.app/api/auth/login`
- `https://your-domain.vercel.app/api/bookings/create`
- `https://your-domain.vercel.app/api/bookings`
- `https://your-domain.vercel.app/api/health`

### Development Setup

For local development, you can still run the backend server separately:

1. **Start Backend Server:**
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   npm install
   npm run dev
   ```

The frontend will automatically use `localhost:3001` in development and relative URLs in production.

## Important Notes

- The `server/` directory is kept for local development only
- Vercel uses the `api/` directory for serverless functions
- Environment variables are managed through Vercel dashboard
- MongoDB connection string should be kept secure and not committed to git

## Troubleshooting

1. **Backend not working on Vercel:**
   - Ensure `MONGODB_URI` is set in Vercel environment variables
   - Check Vercel function logs in the dashboard
   - Verify all API files are in the `api/` directory

2. **CORS issues:**
   - The serverless functions handle CORS automatically
   - If you face CORS issues, check the API endpoint URLs

3. **Build failures:**
   - Ensure all dependencies are in `package.json`
   - Check for any TypeScript errors
   - Verify the build works locally with `npm run build`
