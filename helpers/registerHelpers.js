const users = require("../data/usersData");

const generateRandomString = function(chars) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = chars;
  let id = "";

  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};

const createNewUser = (users, newUserData) => {
  const newId = generateRandomString(3);

  const newUser = {
    id: newId,
    email: newUserData.email,
    password: newUserData.password,
  };

  // Add new user to users object
  users[newId] = newUser;

  // Check for invalid user data
  const isInvalidUser = Object.values(newUser).filter((value) => value === "").length > 0;

  if (isInvalidUser) {
    return { error: "Empty field", data: null };
  }

  return { error: null, data: newUser };  // Return the new user data if no error
};






module.exports = { generateRandomString, createNewUser};