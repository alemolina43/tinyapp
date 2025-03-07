const users = require("../data/users");
const urlDatabase = require("../data/urlsDatabase");
const bcrypt = require("bcryptjs");

const generateRandomString = function(chars) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = chars;
  let id = "";

  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};

const getUserByEmail = (users, email) => {
  for (let user in users) { //loop through the users object
    if (users[user].email === email) { //if the user object matches email, return the user object
      return users[user];
    }
  }
  return undefined;
};

const createNewUser = (email, password) => {
  const existingUser = getUserByEmail(users, email);

  if (existingUser) {
    return { error: "Email already exists", data: null };
  }

  const id = generateRandomString(3);
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  const newUser = { id, email, password: hashedPassword };

  // Add new user to users object
  // Check for invalid user data
  if (!email || !password) {
    return { error: "Empty field", data: null };
  }
  
  return { error: null, data: newUser };  // Return the new user data if no error
};

const authenticateUser = (email, password) => {
  const user = getUserByEmail(users, email);
  const errorMessage = "Incorrect user/password";
  if (!user) {
    return { error: errorMessage, data: null };
  }

  const isSamePassword = bcrypt.compareSync(password, user.password); //compare hashed password

  if (!isSamePassword) {
    return { error: errorMessage, data: null };
  }

  return { error: null, data: user };
};

const urlsForUser = (userId) => {
  let userURLs = {};
  const ids = Object.keys(urlDatabase);

  for (const id of ids) {
    const url = urlDatabase[id];
    if (url.userID === userId) {
      userURLs[id] = { ...url };
    }
  }
  return userURLs;
};

module.exports = { generateRandomString, createNewUser, getUserByEmail, authenticateUser, urlsForUser };