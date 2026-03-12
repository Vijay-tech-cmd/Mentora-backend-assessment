require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../src/models/User');

async function diagnose() {
    try {
        console.log('\n=== DIAGNOSTIC START ===\n');

        // 1. Test MongoDB connection
        console.log('1. Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected\n');

        // 2. Test bcrypt
        console.log('2. Testing bcrypt hashing...');
        const hash = await bcrypt.hash('password123', 12);
        console.log('bcrypt OK:', hash.substring(0, 20) + '...\n');

        // 3. Test JWT
        console.log('3. Testing JWT signing...');
        const token = jwt.sign({ id: 'testid' }, process.env.JWT_SECRET, { expiresIn: '7d' });
        console.log('JWT OK:', token.substring(0, 30) + '...\n');

        // 4. Test User creation and save
        console.log('4. Creating and saving a test User...');
        const testEmail = 'diag_' + Date.now() + '@test.com';
        const user = new User({
            email: testEmail,
            password: 'password123',
            name: 'Diagnostic User',
            role: 'parent'
        });
        console.log('User instance created.');
        await user.save();
        console.log('User saved successfully!\n');

        // 5. Cleanup
        await User.deleteOne({ email: testEmail });
        console.log('5. Test user cleaned up\n');

        console.log('=== ALL CHECKS PASSED ===\n');
    } catch (err) {
        console.error('\n DIAGNOSTIC FAILED AT STEP:');
        console.error('Name:', err.name);
        console.error('Message:', err.message);
        if (err.errors) {
            console.error('Validation Errors:', JSON.stringify(err.errors, null, 2));
        }
        console.error('Stack:', err.stack);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

diagnose();
