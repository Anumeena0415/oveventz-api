# Vercel Deployment Guide

## Environment Variables Setup

When deploying to Vercel, you need to configure the following environment variables in your Vercel dashboard:

### Required Environment Variables:

1. **VITE_BACKEND_URL**
   - Value: `https://ovevents.onrender.com`
   - Description: Backend API URL

2. **VITE_EMAILJS_SERVICE_ID** (if using email functionality)
   - Value: Your EmailJS Service ID
   - Description: EmailJS service configuration

3. **VITE_EMAILJS_TEMPLATE_ID** (if using email functionality)
   - Value: Your EmailJS Template ID
   - Description: EmailJS template configuration

4. **VITE_EMAILJS_PUBLIC_KEY** (if using email functionality)
   - Value: Your EmailJS Public Key
   - Description: EmailJS public key

### How to Add Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the values above
5. Make sure to set them for all environments (Production, Preview, Development)
6. Redeploy your application

## Common Issues and Solutions:

### Issue 1: VendorDetails showing "N/A" values
**Cause**: Environment variables not properly configured in Vercel
**Solution**: Ensure `VITE_BACKEND_URL` is set correctly in Vercel environment variables

### Issue 2: API calls failing
**Cause**: CORS issues or authentication problems
**Solution**: Check that your backend CORS settings include your Vercel domain

### Issue 3: Build failures
**Cause**: Missing environment variables during build
**Solution**: Add all required environment variables in Vercel dashboard

## Backend CORS Configuration:

Make sure your backend (server.js) includes your Vercel domain in the allowedOrigins:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://occasionsuper.in',
  'https://ocassion-super.vercel.app', // Add your actual Vercel domain
  process.env.CLIENT_URL
].filter(Boolean);
```

## Testing:

After deployment:
1. Check browser console for any errors
2. Verify environment variables are loaded correctly
3. Test API endpoints are accessible
4. Check network tab for failed requests
