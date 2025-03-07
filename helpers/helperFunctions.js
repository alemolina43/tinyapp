const users = require("../data/usersData");
const urlDatabase = require("../data/urlsData");
const bcrypt = require("bcryptjs");

const generateRandomString = function(num) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = num;
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
  return null;
};

const createNewUser = (users, newUserData) => {
  const existingUser = getUserByEmail(users, newUserData.email);

  if (existingUser) {
    return { error: "Email already exists", data: null };
  }

  const newId = generateRandomString(3);

  const newUser = {
    id: newId,
    email: newUserData.email,
    password: bcrypt.hashSync(newUserData.password, 10)
  };
  console.log(newUser);
  // Add new user to users object
  // users[newId] = newUser;
  //console.log(users);
  // Check for invalid user data
  const isInvalidUser = Object.values(newUser).filter((value) => value === "").length > 0;

  if (isInvalidUser) {
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

  //compare hashed passwords
  const isSamePassword = bcrypt.compareSync(password, user.password);

  if (!isSamePassword) {
    return { error: errorMessage, data: null };
  }

  return { error: null, data: user };
};

const urlsForUSer = (id) => {
  let userURLs = {};
  for (let urlID in urlDatabase) {
    //console.log('urlID ', urlID);
    if (urlDatabase[urlID].userID === id) {
      userURLs[urlID] = { longURL: urlDatabase[urlID].longURL, userID: id};
    }
  }
  return userURLs;
};

module.exports = { generateRandomString, createNewUser, getUserByEmail, authenticateUser, urlsForUSer };