async function testSignup() {
    try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test' + Date.now() + '@example.com',
                password: 'password123',
                name: 'Test User',
                role: 'parent'
            })
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Signup Successful:', JSON.stringify(data, null, 2));
        } else {
            console.error('Signup Failed:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('Fetch Error:', error.message);
    }
}

testSignup();
