const jwt = require("jsonwebtoken");
const User = require("../models/user");

const signToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN || "1d";
    return jwt.sign(payload, secret, { expiresIn });
};

module.exports = {
    register: async (req, res) => {
        try {
            const { email, password, businessName, ownerName, city, serviceArea, othersCategories } = req.body;

            // Validate required fields
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Email and password are required"
                });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "User with this email already exists"
                });
            }

            // Create new user with vendor fields
            const userData = {
                email: email.toLowerCase().trim(),
                password,
                role: "vendor",
                businessName: businessName || null,
                ownerName: ownerName || null,
                city: city || null,
                serviceArea: serviceArea || null,
                othersCategories: othersCategories || [],
            };

            const user = new User(userData);
            await user.save();

            // Generate token
            const token = signToken({
                sub: user._id.toString(),
                role: user.role,
                vendor_id: user.vendor_id ? user.vendor_id.toString() : null,
            });

            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: {
                    token,
                    user: {
                        id: user._id,
                        email: user.email,
                        role: user.role,
                        businessName: user.businessName,
                        ownerName: user.ownerName,
                        city: user.city,
                        serviceArea: user.serviceArea,
                        othersCategories: user.othersCategories,
                        vendor_id: user.vendor_id,
                    },
                },
            });
        } catch (error) {
            console.error("Registration error:", error);

            if (error.name === "ValidationError") {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: Object.values(error.errors).map(err => err.message)
                });
            }

            if (error.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists"
                });
            }

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    },
    registerCustomer: async (req, res) => {
        try {
            const { email, password, name, phone_number } = req.body;

            // Validate required fields
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Email and password are required"
                });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "User with this email already exists"
                });
            }

            // Create new customer user
            const userData = {
                email: email.toLowerCase().trim(),
                password,
                role: "customer",
                phone_number: phone_number || null,
            };

            const user = new User(userData);
            await user.save();

            // Generate token
            const token = signToken({
                sub: user._id.toString(),
                role: user.role,
            });

            return res.status(201).json({
                success: true,
                message: "Customer registered successfully",
                data: {
                    token,
                    user: {
                        id: user._id,
                        email: user.email,
                        role: user.role,
                        phone_number: user.phone_number,
                    },
                },
            });
        } catch (error) {
            console.error("Customer registration error:", error);

            if (error.name === "ValidationError") {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: Object.values(error.errors).map(err => err.message)
                });
            }

            if (error.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists"
                });
            }

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    },
     registerData: async (req, res) => {
            try {
               
                const users = await User.find()
                return res.status(200).json({ success: true, data: users });
            } catch (error) {
                console.error("listVendorUsers error:", error);
                return res.status(500).json({ success: false, message: "Internal Server Error" });
            }
        },

    login: async (req, res) => {
        try {
            let { email, password } = req.body || {};

            email = typeof email === "string" ? email.trim().toLowerCase() : email;
            password = typeof password === "string" ? password.trim() : password;

            if (!email || !password) {
                return res.status(400).json({ success: false, message: "email and password are required" });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success: false, message: "Invalid email" });
            }

            if (!user.is_active) {
                return res.status(403).json({ success: false, message: "Account is inactive" });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: "Invalid credentials" });
            }

            user.last_login = new Date();
            await user.save();

            const token = signToken({
                sub: user._id.toString(),
                role: user.role,
                vendor_id: user.vendor_id ? user.vendor_id.toString() : null,
            });

            return res.status(200).json({
                success: true,
                message: "Login successful",
                data: {
                    token,
                    user: {
                        id: user._id,
                        email: user.email,
                        role: user.role,
                        phone_number: user.phone_number,
                        businessName: user.businessName,
                        ownerName: user.ownerName,
                        city: user.city,
                        serviceArea: user.serviceArea,
                        othersCategories: user.othersCategories,
                        vendor_id: user.vendor_id,
                    },
                },
            });
        } catch (error) {
            console.error("login error:", error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

 saveData : async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Email and password are required" 
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Check for existing email
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: "Email already registered. Please login instead." 
      });
    }

    // Create new user (User model doesn't have 'name' field, only email and password)
    const user = new User({ 
      email: normalizedEmail, 
      password: password.trim(),
      role: "vendor" // Default role
    });
    await user.save();

    res.status(201).json({ 
      success: true,
      message: "User registered successfully!",
      data: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("saveData error:", err);
    
    if (err.name === "ValidationError") {
      return res.status(400).json({ 
        success: false,
        message: "Validation failed",
        error: Object.values(err.errors).map(e => e.message).join(", ")
      });
    }

    if (err.code === 11000) {
      return res.status(409).json({ 
        success: false,
        message: "Email already exists" 
      });
    }

    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: err.message 
    });
  }
},

//   saveData: async (req, res) => {
//         try {
//             let { email, password } = req.body || {};
//             let createUser = await User.create({email,password})
            
                       
//         } catch (error) {
//             console.error("login error:", error);
//             return res.status(500).json({ success: false, message: "Internal Server Error" });
//         }
//     },




// testData: async (req, res) => {
//     console.log("hello world");
//     res.status(200).json({ success: true, message: "Test endpoint working" });
//             // try {
               
//             //     const users = await User.find()
//             //     return res.status(200).json({ success: true, data: users });
//             // } catch (error) {
//             //     console.error("listVendorUsers error:", error);
//             //     return res.status(500).json({ success: false, message: "Internal Server Error" });
//             // }
//         },




};


