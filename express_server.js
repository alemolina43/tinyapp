const express = require("express");
let cookieParser = require('cookie-parser');
const { generateRandomString, createNewUser, getUserByEmail, authenticateUser } = require("./helpers/registerHelpers");
const users = require("./data/usersData");
const app = express();
const PORT = 8080; // default port 8080

app.use(cookieParser());
app.set("view engine", "ejs"); //set EJS as the view engine

const urlDatabase = {
  b2xVn2: "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
};


app.use(express.urlencoded({ extended: true })); //middleware which will translate, or parse the body

//create a new short URL once the form is submitted
app.post("/urls", (req, res) => {
  console.log(req.body); // Log the POST request body to the console
  const newId = generateRandomString(6);
  if (req.body['longURL'].startsWith("http://")) {
    urlDatabase[newId] = req.body['longURL'];
  } else {
    urlDatabase[newId] = `http://${req.body['longURL']}`;
  }
  //console.log(urlDatabase);
  res.redirect(`/urls/${newId}`);
});

//delete a URL
app.post("/urls/:id/delete", (req, res) => {
  const id = req.params.id;
  delete urlDatabase[id]; // Remove the url  from the object
  res.redirect("/urls"); // Redirect back to the urls page
});

//update an existing URL
app.post("/urls/:id", (req, res) => {
  const id = req.params.id;
  const newLongURL = req.body.longURL;
  urlDatabase[id] = newLongURL;
  res.redirect("/urls"); // Redirect back to the URLs page
});

app.post("/login", (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const existingUser = authenticateUser(userEmail, userPassword);
  
  if (existingUser.error) {
    // res.redirect("/register");
    return res.status(403).send(existingUser.error);

  }

  if (existingUser.data) {
    res.cookie("user_id", existingUser.data.id);  // set a cookie with the user.id
    res.redirect("/urls");
  }
  //console.log(req.body);
  
});

app.post("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.redirect("/login"); // Redirect back to the login page
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
  const userId = req.cookies["user_id"];
  const user = users[userId];
  const urls = urlDatabase;
  const templateVars = {
    user, urls
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const userId = req.cookies["user_id"];
  const user = users[userId];
  const templateVars = {
    user
  };
  res.render("urls_new", templateVars);
});

app.get("/urls/:id", (req, res) => {
  const id = req.params.id;
  const userId = req.cookies["user_id"];
  const user = users[userId];

  const templateVars = {
    id,
    longURL: urlDatabase[id],
    user,
  };
  res.render("urls_show", templateVars);
});

app.get("/u/:id", (req, res) => {
  const longURL = urlDatabase[req.params.id];
  //const username = req.cookies["username"];
  res.redirect(longURL);
});

app.get("/register", (req, res) => {
  if (req.cookies["user_id"] !== undefined) {
    res.redirect("urls");
  }
  const user = null;

  const templateVars = {
    user
  };
  res.render("register", templateVars);
});

app.post("/register", (req, res) => {
  // Create new user
  const { error, data: newUser } = createNewUser(users, req.body);
  console.log(newUser);
  if (error) {
    return res.status(400).send(error);
  }
  users[newUser.id] = newUser;
  // Set a cookie with the user id and redirect to /urls
  res.cookie("user_id", newUser.id);  // set a cookie with the user.id
  res.redirect("/urls");  // Redirect to the /urls page
  //console.log(users);
});

app.get("/login", (req, res) => {
  const user = null;

  const templateVars = {
    user
  };
        
  res.render("login", templateVars);
});


app.listen(PORT, () => {
  console.log(`Tiny app listening on port ${PORT}!`); //This will allow the server to "listen" to requests
});