require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../src/models/User');

const TEST_EMAIL = 'demo@mentora.com';
const TEST_PASSWORD = 'mentora123';

async function createTestUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // Remove any existing demo user to start fresh
        await User.deleteOne({ email: TEST_EMAIL });

        const user = new User({
            email: TEST_EMAIL,
            password: TEST_PASSWORD,
            name: 'Demo User',
            role: 'parent'
        });
        await user.save();

        console.log('\n✅ Test user created successfully!\n');
        console.log('=== LOGIN CREDENTIALS ===');
        console.log('Email:   ', TEST_EMAIL);
        console.log('Password:', TEST_PASSWORD);
        console.log('Role:    ', 'parent');
        console.log('=========================\n');
        console.log('POST http://localhost:5000/api/auth/login');
        console.log('Body: { "email": "' + TEST_EMAIL + '", "password": "' + TEST_PASSWORD + '" }\n');
    } catch (err) {
        console.error('Failed:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}

createTestUser();
