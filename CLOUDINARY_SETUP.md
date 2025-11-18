# Cloudinary Setup Guide

## Environment Variables Required

Create a `.env` file in the backend directory with the following variables:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration (if using MongoDB)
MONGODB_URI=mongodb://localhost:27017/occasionsuper

# Client URL for CORS
CLIENT_URL=https://ocassion-super-5kzj.vercel.app
```

## How to Get Cloudinary Credentials

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to your Dashboard
3. Copy the following values:
   - Cloud Name
   - API Key
   - API Secret

## File Upload Flow

1. **Frontend**: User selects files in the vendor registration form
2. **Frontend**: Files are uploaded to Cloudinary via `/api/upload` endpoint
3. **Backend**: Cloudinary returns secure URLs for uploaded files
4. **Frontend**: Cloudinary URLs are stored in form state
5. **Frontend**: When form is submitted, Cloudinary URLs are sent to backend
6. **Backend**: URLs are stored in the database

## Supported File Types

- **All File Types**: Any file type can be uploaded (images, videos, documents, etc.)
- **No Restrictions**: The system accepts all file formats without validation
- **Cloudinary Support**: Cloudinary handles all file types automatically

## Security Features

- Files are uploaded directly to Cloudinary (not stored on your server)
- Secure URLs are generated for each file
- File type validation on frontend and backend
- Files are organized in `vendor_uploads` folder on Cloudinary
