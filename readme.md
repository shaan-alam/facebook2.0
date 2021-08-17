![Facebook2.0](https://user-images.githubusercontent.com/48273777/129712550-ebe54ffa-6de1-4d65-9977-9ba9b543879c.gif)

### Facebook2.0 - An Beautiful Open Source Facebook Clone

![License](https://img.shields.io/github/license/shaan71845/facebook2.0) ![Made with love](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red) ![Github forks](https://img.shields.io/github/forks/shaan71845/facebook2.0) ![Github Start](https://img.shields.io/github/stars/shaan71845/facebook2.0)

# Description

This project is a Open Source Facebook Clone built using MERN Stack. It is not just another clone, but it is a Social Media Application which has its features inspired from Facebook, Instagram etc.

`Note - This Project is currently in Development Phase 🤖️`

# Technologies Used 👩‍💻️

- [React](https://reactjs.org/) as front end library.
- [Redux](https://redux.js.org/) for state management.
- [React Query](https://react-query.tanstack.com/) for Caching & Network Requests.
- [Formik](https://formik.org/) for Form Management
- [Tailwind CSS](https://tailwindcss.com/) as CSS Library.
- [Node.js](https://nodejs.org/en/) + [Express](https://expressjs.com/) at the backend.
- [MongoDB](https://www.mongodb.com/) for Database.
- [TypeScript](https://www.typescriptlang.org/) for Type support for both front end & back end.

# Installation

- Clone this repo by typing `git clone https://github.com/shaan71845/facebook2.0.git` in your terminal.
- Install client side dependencies -

```bash
cd client
npm install // If you use npm
or
yarn install // If you use Yarn
```

- Install Sever side dependencies -

```bash
cd server
npm install // If you use npm
or
yarn install // If you use Yarn
```

# Configuration

##### Server side

In your server folder, create a `.env` file and create following environment variables.

Also signup at [cloudinary.com](https://cloudinary.com/) and get your cloudinary configurations (Cloud name, API Key, API Secret) and paste them in this file.

```
MONGO_URI= // Your MongoDB Database URI
PORT= // Your Express Server PORT
JWT_SECRET= // Your JWT Secret
CLOUDINARY_CLOUD_NAME= // Your Cloudinary Cloud Name
CLOUDINARY_API_KEY= // Your Cloudinary API Key
CLOUDINARY_API_SECRET=// Your Cloudinary API Secret
CLOUDINARY_POST_UPLOAD_FOLDER=// Your Cloudinary Post upload folder path
```

##### Client side

In your client folder, create a .env file and create the following environment variables.

```
REACT_APP_CLIENT_ID= // Your Google OAuth Client ID
REACT_APP_CLIENT_SECRET= // Your Google OAuth Client Secret
```
