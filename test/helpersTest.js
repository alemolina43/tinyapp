const { assert } = require('chai');
const { getUserByEmail, urlsForUser } = require('../helpers.js');

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

const urlDatabase = {
  "b2xVn2": {
    longURL: "http://www.facebook.com",
    userId: "userRandomID"
  },
  "9smJm9": {
    longURL: "http://www.google.com",
    userId: "user2RandomID"
  },
  "h4xVw9": {
    longURL: "http://www.example.com",
    userId: "userRandomID"
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

 
describe('urlsForUser', function() {
  
  it('should return an empty object if the user has no URLs', function() {
    const userUrls = urlsForUser("nonExistentUser");
    assert.deepEqual(userUrls, {}, 'Should return an empty object if no URLs are found for the user');
  });
  
  it('should return an empty object if there are no URLs in the urlDatabase', function() {
    const emptyDatabase = {};
    const userUrls = urlsForUser("userRandomID", emptyDatabase);
    assert.deepEqual(userUrls, {}, 'Should return an empty object if no URLs exist in the urlDatabase');
  });
  
  it('should not return URLs that do not belong to the specified user', function() {
    const userUrls = urlsForUser("userRandomID");
  
    // We should not return the URL with userId "user2RandomID"
    assert.notProperty(userUrls, "9smJm9", 'Should not include URLs that do not belong to the specified user');
  });
});

