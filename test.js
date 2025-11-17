const axios = require('axios');

const testData = {
    businessName: "Test Business",
    ownerName: "Test Owner",
    email: "test@example.com",
    phone: "1234567890",
    city: "Test City",
    serviceArea: "Test Area",
    categories: ["Wedding Services"],
    socialMedia: "",
    images: null,
    videos: null,
    packages: [],
    documents: {
        gst: null,
        businessProof: null,
        idProof: null
    },
    bankDetails: {
        accountHolder: "",
        accountNumber: "",
        ifsc: ""
    }
};

async function testVendorRegistration() {
    try {
        console.log('Testing vendor registration...');
        console.log('Test data:', testData);
        
        const response = await axios.post('https://ocassionsuper-3.onrender.com/api/register/vendor/register', testData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        console.error('Status:', error.response?.status);
    }
}

testVendorRegistration();
