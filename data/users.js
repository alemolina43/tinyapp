const bcrypt = require("bcryptjs");

const users = {
  JzB:
     { id: 'JzB',
       email: 'example@gmail.com',
       password: bcrypt.hashSync("1234", 10)
     }
};



module.exports = users;