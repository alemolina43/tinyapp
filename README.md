# TinyApp Project

Welcome to the **Tiny App** full stack app! 🎉 It was built with Node and Express and allows users to shorten long URLs.

## Table of Contents

- [What it does](#what-it-does)
- [Features](#features)
- [Dependencies](#dependencies)
- [Final Product](#final-product)
- [Getting Started](#getting-started)
- [Testing](#testing)

## What it does

- **Why do I need a shorter URL?**: Shortening URLs improves aesthetics, making them more visually appealing, easier to share, and space-efficient, especially on character-limited platforms. 💪
- **Only URLs belonging to the specified user:**: Returns URLs owned by the given user and not others. 🕵️‍♂️
- **Handle Edge Cases**: No URLs for a user? Empty database? No problem, we handle it gracefully! 🙌
- **Prevent Unauthorized Access**: We make sure you can only view URLs that belong to the specified user. 😎

## Features

- Custom User Authentication: Create an account and log in to your account to securely manage your shortened URLs. 🔒
- URL Shortening: Easily shorten any long URL for easy sharing. 🎯
- Unique Short Links: Each URL gets a unique short code that directs users to the original long URL. 🧩
- View and Edit URLs: View your list of shortened URLs and update or delete them as needed. 🔄
- Private URL Database: Your shortened URLs are securely stored and are only accessible by you! 🛡️

## Dependencies

- Node.js
- Express
- EJS
- bcryptjs
- cookie-session
- Mocha and chai for testing

## Final Product

!["Main URLs page"](https://raw.githubusercontent.com/alemolina43/tinyapp/refs/heads/master/docs/myUrls.png)
!["Register Page"](https://raw.githubusercontent.com/alemolina43/tinyapp/refs/heads/master/docs/Register.png)
!["Login Page"](https://raw.githubusercontent.com/alemolina43/tinyapp/refs/heads/master/docs/Login.png)
!["Create tiny URL"](https://raw.githubusercontent.com/alemolina43/tinyapp/refs/heads/master/docs/Create_tinyURL.png)
!["Tiny URL page"](https://raw.githubusercontent.com/alemolina43/tinyapp/refs/heads/master/docs/Edit_redirect_TURL.png)

## Getting Started

- Clone the repository using the command:
- clone the repo 💅🏻
- Install all dependencies by running:
  - npm install
- Run the development web server:
  - node express_server.js
- Access the app by opening your browser and navigating to:
  - http://localhost:8080

## Testing

- Mocha & Chai: This app uses Mocha and Chai for testing. Run the tests by executing the following command:
  - npm test
- Test functions: The helper functions are tested to ensure they handle edge cases like no URLs or invalid users properly. 💻
- Automated testing: Unit tests validate the functionality of the URL shortening process and user authentication. ✅
