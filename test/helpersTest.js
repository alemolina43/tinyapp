const { assert } = require('chai');

const { getUserByEmail } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = getUserByEmail(testUsers, "user@example.com");
    const expectedUserID = "userRandomID";
    assert.isNotNull(user, 'user should not be null');
    assert.equal(user.id, expectedUserID, 'ids should match');
  });
  
  it('should return undefined if we pass in an email that is not in our users database', function() {
    const user = getUserByEmail(testUsers, "user3@example.com");
    assert.isUndefined(user, 'User should be undefined when email is not found');
  });
});
