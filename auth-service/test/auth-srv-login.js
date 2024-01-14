const { expect } = require('chai');
const { login } = reuire('../services/userLoginService');


describe('Login Function', () => {
  it('should return a valid token for valid credentials', async () => {
    const req = { body: { username: 'testuser', password: 'testpassword',userId:"uuid2" } };
    const [statusCode, response] = await login(req);
    
    expect(statusCode).to.equal(200);
    expect(response.status).to.be.true;
    expect(response.token).to.be.a('string');
  });

  it('should return an error message for invalid credentials', async () => {
    const req = { body: { username: 'testuser', password: 'wrongpassword' } };
    const [statusCode, response] = await login(req);

    expect(statusCode).to.equal(400);
    expect(response.status).to.be.false;
    expect(response.message).to.equal('Invalid credentials');
  });

  it('should return an error message for non-existing username', async () => {
    const req = { body: { username: 'nonexistentuser', password: 'testpassword' } };
    const [statusCode, response] = await login(req);

    expect(statusCode).to.equal(400);
    expect(response.status).to.be.false;
    expect(response.message).to.equal('Username does not exist');
  });

  // Add more test cases as needed
});
