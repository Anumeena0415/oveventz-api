const axios = require('axios');

// Test the vendor profile API endpoint
async function testVendorProfileAPI() {
    const baseURL = 'https://ocassionsuper-3.onrender.com';
    const testUserId = '507f1f77bcf86cd799439011'; // Replace with a valid user ID
    
    try {
        console.log('Testing vendor profile API...');
        
        // Test GET endpoint
        const response = await axios.get(`${baseURL}/api/vendor/${testUserId}/profile`, {
            headers: {
                'Authorization': 'Bearer test-token', // This will fail auth, but we can see the response structure
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ GET /api/vendor/:userId/profile - Success');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        
    } catch (error) {
        console.log('❌ GET /api/vendor/:userId/profile - Error');
        console.log('Status:', error.response?.status);
        console.log('Message:', error.response?.data?.message);
        console.log('Full Error:', error.response?.data);
    }
}

// Run the test
testVendorProfileAPI();
