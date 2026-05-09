# 🚀 Backend API - User Authentication & Avatar Upload

This is a Node.js backend project built with Express, MongoDB, Multer, and Cloudinary for handling user authentication and avatar/image uploads.

## 📌 Features
- User Registration
- Password Hashing using bcrypt
- Avatar/Image Upload using Multer
- Cloud Image Storage using Cloudinary
- MongoDB Database Integration
- Environment Variables using dotenv

## 🛠️ Tech Stack
Node.js, Express.js, MongoDB, Mongoose, Multer, Cloudinary, JWT, bcrypt, dotenv

## 📁 Project Structure
src/
controllers/
models/
routes/
middleware/
utils/
config/
public/temp/
server.js

## ⚙️ Installation

### 1. Clone repository
git clone https://github.com/your-username/your-project.git
cd your-project

### 2. Install dependencies
npm install

### 3. Create .env file
MONGO_URI=mongodb://localhost:27017/mydatabase
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

### 4. Run server
nodemon server.js

Server runs on:
http://localhost:3000

## 📤 API Endpoints

POST /api/register
Form-data:
username, email, password, avatar(file)



## ☁️ Avatar Flow
Multer uploads file → temp folder → Cloudinary upload → URL saved in MongoDB → temp file deleted

## 🔐 Security
- bcrypt password hashing
- JWT authentication
- Environment variables protection
- Cloud storage for images

## 🚀 Future Improvements
- Refresh token system
- Role-based authentication
- Email verification
- Password reset
- Pagination

## 👨‍💻 Author
Backend project built using Node.js, Express, MongoDB, Multer, Cloudinary

