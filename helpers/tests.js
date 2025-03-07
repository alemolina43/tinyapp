const generateRandomString = function(chars) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = chars;
  let id = "";

  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};

const users = {};

const createNewUser = (email, password) => {
  const newId = generateRandomString(3);

  users[newId] = {
    id: newId,
    email,
    password
  };

  const isInvalidUser =
    Object.values(users).filter((value) => value === "").length > 0;

  if (isInvalidUser) {
    return { error: "Empty field", data: null };
  }

  return users[newId];
};

const getUserByEmail = (users, email) => {
  for (let user in users) {
    if (users[user].email === email) {
      return users[user];
    }
  }
  return null;
};

const authenticateUser = (email, password) => {
  const user = getUserByEmail(email);

  if (!user) {
    return { error: "No user found.", data: null };
  }

  if (user.password !== password) {
    return { error: "Incorrect Password", data: null };
  }

  return { error: null, data: user };
};

createNewUser("example@gmail.com", 1234);
createNewUser("hi@gmail.com", 5365);
//console.log(getUserByEmail('example@gmail.com'));
authenticateUser('example@gmail.com', 1234);

//console.log(users);
//console.log(fetchUserByEmail(users, "example@gmail.com"));