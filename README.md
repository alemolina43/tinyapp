# TinyApp Project

Welcome to the **Tiny App** full stack app! 🎉 It was built with Node and Express and allows users to shorten long URLs.

## Table of Contents

- What it does.
- Features.
- Dependencies.
- Final Product.
- Getting Started.
- Testing.

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

!["screenshot description"](#)
!["screenshot description"](#)

## Getting Started

- Clone the repository using the command:
- clone the repo 💅🏻
- Install all dependencies by running:
  - npm install
- Run the development web server:
  - node express_server.js
- Access the app by opening your browser and navigating to:
  - http://localhost:8080
