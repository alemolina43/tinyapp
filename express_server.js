//require external resources
const express = require("express");
//const cookieParser = require('cookie-parser'); is replaced by cookieSession
const cookieSession = require("cookie-session");

//set up data and helpers
const { generateRandomString, createNewUser, authenticateUser, urlsForUser } = require("./helpers");
const users = require("./data/users");
const urlDatabase = require("./data/urlsDatabase");

//initialize my server
const app = express();
const PORT = 8080; // default port 8080
app.set("view engine", "ejs"); //set EJS as the view engine

// Parse the content of cookie string to a cookie object (Parsing/Rendering/Interpreting)
//app.use(cookieParser()); replace by cookieSession

// Encrypt / Decrypt the content of the "session" cookie
app.use(
  cookieSession({
    keys: ["Hola, yo voy a protegerte"],
    name: "session",
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

//parse the content of the from body into an object
app.use(express.urlencoded({ extended: true })); //middleware which will translate, or parse the body

//REST API CRUD users
//create a new short URL once the form is submitted
app.post("/urls", (req, res) => {
  const userID = req.session.user_id;
  const user = users[userID];
  if (!user) {
    return res.status(400).send("You need to be loged in to use this API.");
  }

  const { longURL } = req.body;
  if (!longURL) {
    return res.status(400).send("Please include a long URL");
  }
  
  if (!longURL.startsWith("http://") && !longURL.startsWith("https://")) {
    return res.status(400).send("Invalid URL");
  }

  const id = generateRandomString(6);
  const url = { userID, longURL };
  urlDatabase[id] = url;
  
  res.redirect(`/urls/${id}`);
});

//read all
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

//read one (tiny URL)
app.get("/u/:id", (req, res) => {
  const longURL = urlDatabase[req.params.id].longURL;
  if (longURL === undefined) {
    return res.status(400).send("<html><body>The short URL does not exists. </body></html>\n");
  }
  
  //const username = req.cookies["username"];
  res.redirect(longURL);
});

//update an existing URL
app.post("/urls/:id", (req, res) => {
  const id = req.params.id;
  const userID = req.session.user_id;
  const user = users[userID];
  if (!user) {
    return res.status(400).send("You need to be loged in to use this API.");
  }
  const url = urlDatabase[id];
  if (url.userID !== userID) {
    return res.status(400).send("You don't own this shortURL.");
  }

  const newLongURL = req.body.longURL;
  url.longURL = newLongURL;
  res.redirect("/urls"); // Redirect back to the URLs page
});

//delete a URL
app.post("/urls/:id/delete", (req, res) => {
  const id = req.params.id;
  const userId = req.session.user_id;
  if (urlDatabase[id].userID !== userId) {
    return res.status(400).send("<html><body>You don't own this shortURL.</body></html>\n");
  }
  delete urlDatabase[id]; // Remove the url  from the object
  res.redirect("/urls"); // Redirect back to the urls page
});

//VIEWS URLS
//URLs index
app.get("/urls", (req, res) => {
  
  if (!req.session.user_id) {
    return res.status(400).send("You need to be loged in to use this API.");
  }
  
  const userId = req.session.user_id;
  const user = users[userId];

  if (!user) {
    return res.redirect("/login");  // Redirect if user doesn't exist
  }
    
  const urls = urlsForUser(userId);
  const templateVars = { user, urls };
  res.render("urls_index", templateVars);
});

//URLs new
app.get("/urls/new", (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  }

  const userId = req.session.user_id;
  const user = users[userId];
  const templateVars = {
    user
  };
  res.render("urls_new", templateVars);
});

//URLs show
app.get("/urls/:id", (req, res) => {
  const userId = req.session.user_id;
  const user = users[userId];
  if (!user) {
    return res.status(400).send("You need to be loged in to use this API.");
  }
  
  const id = req.params.id;
  const url = urlDatabase[id];
  if (!url) {
    return res.status(400).send("URL doesn't exists.");
  }

  if (url.userID !== userId) {
    return res.status(400).send("You don't own this shortURL.");
  }
  const templateVars = {url, user, id };
  
  res.render("urls_show", templateVars);
});

//REST API AUTH(users)
//register
app.post("/register", (req, res) => {
  // Create new user
  const { error, data: newUser } = createNewUser(req.body.email, req.body.password);
  
  if (error) {
    return res.status(400).send(error);
  }
  users[newUser.id] = newUser;
  req.session.user_id = newUser.id;  // store the user ID in the session
  
  res.redirect("/urls");  // Redirect to the /urls page
});

//login
app.post("/login", (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const existingUser = authenticateUser(userEmail, userPassword);
  
  if (existingUser.error) {
    return res.status(403).send(existingUser.error);
  }

  if (existingUser.data) {
    req.session.user_id = existingUser.data.id;  // store user ID in session
    res.redirect("/urls");
  }
  
});

//logout
app.post("/logout", (req, res) => {
  req.session.user_id = {}; //there is no clear cookie so we set value to null;
  res.redirect("/login"); // Redirect back to the login page
});

//VIEWS AUTH
app.get("/register", (req, res) => {
  if (req.session.user_id) {
    return res.redirect("urls");
  }
  const user = null;

  const templateVars = {
    user
  };
  res.render("register", templateVars);
});

app.get("/login", (req, res) => {
  if (!req.session.user_id) {
    return res.redirect("urls");
  }
          
  res.render("login", {user: null});
});

//HOME ROUTE
app.get("/", (req, res) => {
  res.send("Hello!");
});


app.listen(PORT, () => {
  console.log(`Tiny app listening on port ${PORT}!`); //This will allow the server to "listen" to requests
});