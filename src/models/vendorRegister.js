const mongoose = require("mongoose");

const VendorRegister = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },

    userId: {
        type: Number,
        unique: true,
        default: 1
    },

    businessName: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /@gmail\.com$/,
            'Email must contain @gmail.com'
        ],
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^[0-9]{10}$/, 'Invalid mobile number. Please enter exactly 10 digits.'],
        set: function (phone) {
            return phone.replace(/\s+/g, ''); // Remove spaces
        }
    },

    city: {
        type: String,
        required: true
    },
    serviceArea: {
        type: String,
        required: true
    }, 
    hasUser : {type :Boolean,default:false},

    socialMedia: {
        type: String,
        required: false,
        default: null,
        trim: true
    },

    categories: {
        type: [String],
        required: true
    },
    othersCategories: {
        type: [String],
        required: false,
        default: []
    },

    images: {
        type: [String],
        required: false,
        default: null
    },

    videos: {
        type: [String],
        required: false,
        default: null
    },

    packages: {
        type: [Object],
        required: false,
        default: []
    },

    documents: {
        gst: {
            type: [String],
            required: false,
            default: null
        },
        businessProof: {
            type: [String],
            required: false,
            default: null
        },
        idProof: {
            type: [String],
            required: false,
            default: null
        }
    },

    bankDetails: {
        accountHolder: {
            type: String,
            required: false,
            default: null
        },
        accountNumber: {
            type: String,
            required: false,
            default: null
        },
        ifsc: {
            type: String,
            required: false,
            default: null
        }
    },

    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'suspended'],
        default: 'pending'
    },
    verificationStatus: {
        emailVerified: {
            type: Boolean,
            default: false
        },
        phoneVerified: {
            type: Boolean,
            default: false
        },
        documentsVerified: {
            type: Boolean,
            default: false
        }
    },

    isActive: {
        type: Boolean,
        default: true
    },

    // updation
    profilePhoto: { type: String, default: "" },
    upiId: { type: String, default: "" },


}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Pre-save middleware to generate userId
VendorRegister.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const lastUser = await this.constructor.findOne({}, {}, { sort: { userId: -1 } });
            this.userId = lastUser ? lastUser.userId + 1 : 1;
        } catch (error) {
            console.error('Error generating userId:', error);
            this.userId = 1; // Fallback
        }
    }
    next();
});

// VendorRegister.index({email: 1}, {unique: true});
// VendorRegister.index({status: 1 , isActive: 1});
// VendorRegister.index({city: 1, categories: 1});

const VendorRegisterModel = mongoose.model("VendorRegister", VendorRegister);

module.exports = VendorRegisterModel;