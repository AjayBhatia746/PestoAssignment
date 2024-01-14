const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let users = [{
    id:"uuid1",
    username: 'Bhatia',
    password: '$2b$10$5WcPDantg35WB0bKMzmXB.CjAdvvhS8ZLbPwofl6deDiW02Xd4V1u',
  }];
const SECRET_KEY = 'test';

let login = async (req) => {
    const { username, password } = req.body;

    // In a real application, you'd validate the credentials against your database
    const user = users.find((u) => u.username === username);

    if (user) {
        // Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
            return [200, { status: true, token}];
        }
        return [400, { status: false, message: 'Invalid credentials' }];
    } else {
        return [400, { status: false, message: 'username does not exist' }];
    }
}

module.exports = {
    login,users
}