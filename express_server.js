const express = require("express");
let cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
const PORT = 8080; // default port 8080
app.set("view engine", "ejs"); //set EJS as the view engine

const urlDatabase = {
  b2xVn2: "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
};

const generateRandomString = function() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 6;
  let id = "";

  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};

app.use(express.urlencoded({ extended: true })); //middleware which will translate, or parse the body

//create a new short URL once the form is submitted
app.post("/urls", (req, res) => {
  console.log(req.body); // Log the POST request body to the console
  const newId = generateRandomString();
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
  const username = req.body.username;
  res.cookie('username', username);//set cookie
  res.redirect("/urls"); // Redirect back to the URLs page
});

app.post("/logout", (req, res) => {
  const username = req.body.username;
  res.clearCookie('username', username);//set cookie
  res.redirect("/urls"); // Redirect back to the URLs page fro now
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
  //console.log('Cookies: ', req.cookies);
  //Cookies:  { username: 'vanillaice' }
  const templateVars = {
    urls: urlDatabase,
    username: req.cookies["username"]
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const templateVars = {
    username: req.cookies["username"],
  };
  res.render("urls_new", templateVars);
});

app.get("/urls/:id", (req, res) => {
  const id = req.params.id;
  const templateVars = {
    id,
    longURL: urlDatabase[id],
    username: req.cookies["username"],
  };
  res.render("urls_show", templateVars);
});

app.get("/u/:id", (req, res) => {
  const longURL = urlDatabase[req.params.id];
  //const username = req.cookies["username"];
  res.redirect(longURL);
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`); //This will allow the server to "listen" to requests
});