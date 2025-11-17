require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/user");
const connectDB = require("./src/config/db");

async function createAdminAccount() {
    try {
        // Connect to database
        await connectDB();
        console.log("✅ Connected to MongoDB");

        // Admin credentials
        const adminEmail = "admin@gmail.com";
        const adminPassword = "admin123";

        // Check if admin already exists
        let admin = await User.findOne({ email: adminEmail });
        if (admin) {
            console.log("⚠️  Admin account already exists!");
            
            // Update password if needed
            admin.password = adminPassword;
            admin.role = "admin";
            admin.is_active = true;
            await admin.save();
            console.log("✅ Admin account updated with new password");
        } else {
            // Create Admin account
            admin = new User({
                email: adminEmail,
                password: adminPassword,
                role: "admin",
                is_active: true
            });

            await admin.save();
            console.log("✅ Admin account created successfully");
        }

        console.log("\n" + "=".repeat(50));
        console.log("🎉 ADMIN ACCOUNT READY!");
        console.log("=".repeat(50));
        console.log("\n📧 Login Credentials:");
        console.log("   Email:", adminEmail);
        console.log("   Password:", adminPassword);
        console.log("   Role: admin");
        console.log("\n✅ You can now login with these credentials!");
        console.log("=".repeat(50) + "\n");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error creating admin account:", error);
        process.exit(1);
    }
}

// Run the script
createAdminAccount();

