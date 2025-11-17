require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/user");
const VendorRegister = require("./src/models/vendorRegister");
const connectDB = require("./src/config/db");

async function createVendorAccount() {
    try {
        // Connect to database
        await connectDB();
        console.log("✅ Connected to MongoDB");

        // Vendor credentials
        const vendorEmail = "vendor@gmail.com";
        const vendorPassword = "Vendor@123";
        const businessName = "Test Event Services";
        const ownerName = "Test Vendor Owner";

        // Check if user already exists
        let user = await User.findOne({ email: vendorEmail });
        if (user) {
            console.log("⚠️  User account already exists, using existing account");
        } else {
            // Create User account
            user = new User({
                email: vendorEmail,
                password: vendorPassword,
                role: "vendor",
                is_active: true
            });
            await user.save();
            console.log("✅ User account created successfully");
        }

        // Check if vendor profile already exists
        let vendorProfile = await VendorRegister.findOne({ email: vendorEmail });
        if (vendorProfile) {
            console.log("⚠️  Vendor profile already exists, using existing profile");
        } else {
            // Create Vendor Profile
            vendorProfile = new VendorRegister({
                businessName: businessName,
                ownerName: ownerName,
                email: vendorEmail,
                phone: "9876543210",
                city: "Mumbai",
                serviceArea: "Mumbai, Thane",
                categories: ["Photography", "Catering"],
                status: "approved",
                isActive: true
            });
            await vendorProfile.save();
            console.log("✅ Vendor profile created successfully");
        }

        // Link vendor_id to user if not already linked
        if (!user.vendor_id) {
            user.vendor_id = vendorProfile._id;
            await user.save();
            console.log("✅ Vendor profile linked to user account");
        }

        console.log("\n" + "=".repeat(50));
        console.log("🎉 VENDOR ACCOUNT CREATED SUCCESSFULLY!");
        console.log("=".repeat(50));
        console.log("\n📧 Login Credentials:");
        console.log("   Email:", vendorEmail);
        console.log("   Password:", vendorPassword);
        console.log("\n📋 Vendor Details:");
        console.log("   Business Name:", businessName);
        console.log("   Owner Name:", ownerName);
        console.log("   Vendor ID:", vendorProfile.userId);
        console.log("   Status:", vendorProfile.status);
        console.log("\n✅ You can now login with these credentials!");
        console.log("=".repeat(50) + "\n");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error creating vendor account:", error);
        process.exit(1);
    }
}

// Run the script
createVendorAccount();

