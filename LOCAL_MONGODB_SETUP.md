# Local MongoDB Setup Guide

## Step 1: MongoDB Install करें

### Windows पर MongoDB Install करना:

1. **MongoDB Community Server Download करें:**
   - https://www.mongodb.com/try/download/community से MongoDB download करें
   - Windows installer (.msi) download करें

2. **Install करें:**
   - Installer run करें
   - "Complete" installation type select करें
   - "Install MongoDB as a Service" option select करें
   - Default port (27017) use करें

3. **MongoDB Service Start करें:**
   ```powershell
   # PowerShell में run करें (Admin rights के साथ)
   net start MongoDB
   ```

   या Windows Services से manually start करें:
   - `Win + R` दबाएं
   - `services.msc` type करें
   - "MongoDB" service find करें और Start करें

## Step 2: .env File Setup करें

Backend folder में `.env` file बनाएं:

```env
# Local MongoDB Connection
DATABASE_URL=mongodb://localhost:27017/oveventz

# JWT Secret (किसी भी random string)
JWT_SECRET=your-secret-key-here-change-this
JWT_EXPIRES_IN=7d

# Server Port
PORT=3000

# Cloudinary (optional - agar file upload chahiye)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Step 3: Vendor Account Create करें

```bash
node create-vendor-account.js
```

## Test Vendor Credentials:

**Email:** vendor@test.com  
**Password:** Vendor@123

---

## Alternative: MongoDB Atlas (Cloud) Use करना

Agar local MongoDB install nahi karna chahte, to MongoDB Atlas use kar sakte hain:

1. https://www.mongodb.com/cloud/atlas पर account बनाएं
2. Free cluster create करें
3. Connection string copy करें
4. `.env` file में `DATABASE_URL` update करें

