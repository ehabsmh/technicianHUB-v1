# technicianHUB-v1

This is my graduation MVP project from ALX Software Engineerning programme

[**API documentation**](https://documenter.getpostman.com/view/25562679/2sA3XY7HwW#intro)

## Description:

Technicians HUB is a web platform designed to connect users with skilled technicians effortlessly. Whether you need a plumber, electrician, HVAC technician, or any other service provider, our platform enables you to find, review, and hire professionals with ease.

---

## Technologies used:

### Backend

- NodeJS
- ExpressJS
- Mongoose

### Frontend

- ReactJS
- Tailwindcss

### Third Services

- json web token
- bcrypt
- nodemailer
- JOI validations

---

## Backend Folder/file structure:

api folder contains everything related to the api such as api views, views controllers and middlewares

### views/technician.js:

This file contains all the views that can be accessed by a technician.

### views/user.js:

This file contains all the views that can be accessed by a client.

### views/auth.js:

this is the authentication views.

### db directory

contains a js file that handles database connection and database transactions.

## Frontend Folder/file structure:

In the src directory it is divided into two main parts, pages and components.

## /pages and /components

- **Clients** folder that defines the pages or components that only clients can see.
- **Technicians** folder that defines the pages or components that only a technician can see.
- **Global** any page that both views can see.

---

## How to run it:

Open two consoles:

In the first one:

```sh
cd backend
```

```sh
npm install
```

```sh
npm start
```

In the second one:

```sh
cd frontend
```

```sh
npm install
```

```sh
npm run dev
```

## What I've learned?

### Backend

- Mongoose ODM
- signing and verifying a json web token.
- Sending emails and handling email confirmations
- What is Middleware and how to use it.

### Frontend

- State Management using Context API.
- Component life cycle.
- Handling routes with Protected Routes.
