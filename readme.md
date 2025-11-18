# OccasionSuper Backend API

A comprehensive Node.js backend API for the OccasionSuper event planning platform, built with Express.js and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone and navigate to backend directory**
```bash
git clone <repository-url>
cd OcassionSuper/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
Create a `.env` file in the backend root directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=https://ocassion-super-5kzj.vercel.app

# Database Configuration
DATABASE_URL=mongodb://localhost:27017/occasionsuper
# OR for MongoDB Atlas:
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/occasionsuper

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Cloudinary Configuration (File Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. **Start the application**
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## 🏗️ Architecture Overview

### Project Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # Database connection configuration
│   ├── controllers/
│   │   ├── admin.js              # Admin operations controller
│   │   ├── auth.js               # Authentication controller
│   │   ├── emailController.js    # Email operations controller
│   │   ├── vendorProfile.js      # Vendor profile management
│   │   └── vendorRegister.js     # Vendor registration controller
│   ├── middlewares/
│   │   ├── authMiddleware.js     # JWT authentication middleware
│   │   └── vendorMiddleware.js   # Vendor-specific middleware
│   ├── models/
│   │   ├── user.js               # User model (admin/vendor)
│   │   └── vendorRegister.js     # Vendor registration model
│   ├── routes/
│   │   ├── adminRoutes.js        # Admin API routes
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── mailRoutes.js         # Email service routes
│   │   ├── vendorProfileRoutes.js # Vendor profile routes
│   │   └── vendorRegisterRoute.js # Vendor registration routes
│   ├── utils/
│   │   ├── errorHandler.js       # Custom error handling
│   │   ├── logger.js             # Winston logging configuration
│   │   └── mailer.js             # Email utility functions
│   ├── validators/
│   │   └── vendorRegister.js     # Joi validation schemas
│   └── server.js                 # Main server file
├── logs/                         # Application logs
├── package.json
└── README.md
```

### Technology Stack

#### Core Technologies
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM

#### Authentication & Security
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

#### File Upload & Storage
- **Cloudinary** - Cloud file storage
- **Multer** - File upload handling
- **Streamifier** - Stream processing

#### Validation & Utilities
- **Joi** - Data validation
- **Express-validator** - Express validation middleware
- **Axios** - HTTP client
- **Winston** - Logging
- **Nodemailer** - Email service

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /login` - User login
- `POST /register` - User registration
- `POST /forgot-password` - Password reset request
- `POST /reset-password` - Password reset confirmation

### Vendor Registration Routes (`/api/register/vendor`)
- `POST /register` - Register new vendor
- `GET /approved` - Get approved vendors list
- `GET /:id` - Get specific vendor details

### Vendor Profile Routes (`/api/vendor`)
- `GET /profile` - Get vendor profile (authenticated)
- `PUT /profile` - Update vendor profile (authenticated)
- `POST /upload` - Upload vendor documents/images

### Admin Routes (`/api/admin`)
- `POST /vendors/approve` - Approve vendor registration
- `POST /users/create-vendor` - Create vendor user account
- `PATCH /users/:id/active` - Activate/deactivate user
- `GET /vendors` - Get all vendor registrations
- `GET /users` - Get all users


### Utility Routes
- `POST /upload` - File upload to Cloudinary
- `GET /cities` - City search (OpenStreetMap integration)
- `POST /vendorEmail` - Send vendor emails

## 🗄️ Database Schema

### User Model
```javascript
{
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  role: String (enum: ['admin', 'vendor']),
  is_active: Boolean (default: true),
  phone_number: String,
  vendor_id: ObjectId (references VendorRegister),
  last_login: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### VendorRegister Model
```javascript
{
  userId: Number (auto-increment, unique),
  businessName: String (required),
  ownerName: String (required),
  email: String (required, unique),
  phone: String (required),
  city: String (required),
  serviceArea: String (required),
  categories: [String] (required),
  packages: [String],
  documents: {
    gst: String,
    businessProof: String,
    idProof: String
  },
  bankDetails: {
    accountHolder: String,
    accountNumber: String,
    ifsc: String
  },
  status: String (enum: ['pending', 'approved', 'rejected']),
  verificationStatus: {
    emailVerified: Boolean,
    phoneVerified: Boolean,
    documentsVerified: Boolean
  },
  images: [String],
  videos: [String],
  socialMedia: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication & Authorization

### JWT Token Structure
```javascript
{
  userId: String,
  email: String,
  role: String,
  iat: Number,
  exp: Number
}
```

### Middleware Usage
```javascript
// Protect routes with authentication
app.use('/api/protected', authMiddleware);

// Admin-only routes
app.use('/api/admin', authMiddleware, adminMiddleware);
```

## 📁 File Upload System

### Cloudinary Integration
- Automatic file optimization
- Multiple format support (images, videos, documents)
- Secure URL generation
- Folder organization (`vendor_uploads/`)

### Upload Endpoint
```javascript
POST /api/upload
Content-Type: multipart/form-data
Body: { file: [File] }

Response: {
  url: "https://res.cloudinary.com/...",
  public_id: "vendor_uploads/..."
}
```

## 📧 Email System

### Email Templates
- Vendor registration confirmation
- Admin notification emails
- Password reset emails

### Configuration
Uses Nodemailer with SMTP configuration:
```javascript
{
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
}
```

## 🧪 Testing with Postman

### Collection Import
Import the provided Postman collection for comprehensive API testing:

```json
{
  "info": {
    "name": "OccasionSuper Backend API",
    "description": "Complete API collection for testing",
    "version": "1.0.0"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000",
      "type": "string"
    }
  ]
}
```

### Test Environment Setup
1. Create environment variables in Postman:
   - `baseUrl`: `http://localhost:5000`
   - `token`: (JWT token for authenticated requests)

2. Run collection tests to verify all endpoints

### Sample Test Data

#### Vendor Registration
```json
{
  "businessName": "Royal Catering Services",
  "ownerName": "Sarah Johnson",
  "email": "sarah@royalcatering.com",
  "phone": "9876543210",
  "city": "Mumbai",
  "serviceArea": "South Mumbai",
  "categories": ["catering"],
  "packages": ["basic", "premium", "luxury"],
  "documents": {
    "gst": "GST987654321",
    "businessProof": "fssai_license.pdf",
    "idProof": "pan_card.pdf"
  },
  "bankDetails": {
    "accountHolder": "Royal Catering Services",
    "accountNumber": "9876543210",
    "ifsc": "HDFC0001234"
  }
}
```

## 🔧 Development Guidelines

### Code Structure Principles
1. **Separation of Concerns**: Validators → Middleware → Controllers → Models
2. **Pure Validation Logic**: Validators contain only validation rules
3. **HTTP Handling**: Middleware handles HTTP responses and data sanitization
4. **Business Logic**: Controllers contain application logic
5. **Data Layer**: Models handle database operations

### Error Handling
```javascript
// Custom error creation
const createError = (statusCode, message, details = null) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.details = details;
  return error;
};

// Usage in controllers
throw createError(400, 'Validation failed', validationErrors);
```

### Logging
```javascript
// Structured logging with Winston
logger.info('Vendor registered successfully', {
  userId: vendor.userId,
  email: vendor.email,
  businessName: vendor.businessName
});
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/occasionsuper
JWT_SECRET=your_production_jwt_secret
CLOUDINARY_CLOUD_NAME=your_production_cloud_name
CLOUDINARY_API_KEY=your_production_api_key
CLOUDINARY_API_SECRET=your_production_api_secret
```

### Deployment Platforms
- **Render.com** - Recommended for Node.js apps
- **Heroku** - Alternative platform
- **DigitalOcean App Platform** - Scalable option
- **AWS EC2** - Full control option

### Build Commands
```bash
# Install production dependencies only
npm ci --only=production

# Start production server
npm start
```

## 📊 Monitoring & Logging

### Log Files
- `logs/combined.log` - All logs
- `logs/error.log` - Error logs only
- `logs/http.log` - HTTP request logs

### Log Levels
- `error` - Error conditions
- `warn` - Warning conditions
- `info` - Informational messages
- `debug` - Debug-level messages

## 🔒 Security Features

1. **Password Hashing**: bcryptjs with salt rounds
2. **JWT Authentication**: Secure token-based auth
3. **CORS Protection**: Configurable origin restrictions
4. **Helmet Security**: HTTP security headers
5. **Input Validation**: Joi schema validation
6. **File Upload Security**: Cloudinary secure uploads
7. **Environment Variables**: Sensitive data protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the logs in `backend/logs/` directory
- Review the API documentation above

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/) - JWT token debugging
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Postman Learning Center](https://learning.postman.com/)