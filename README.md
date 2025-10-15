# 📝 Blog Backend API (Node.js + Express + MongoDB)

A simple and secure backend for a Blog Application built using **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**.  
It allows users to **sign up**, **sign in**, and **create / update / delete / view** blogs securely.

---

## 🚀 Features

✅ User Signup & Signin with password hashing (bcrypt)  
✅ JWT-based Authentication for secure routes  
✅ CRUD Operations for Blogs  
✅ MongoDB + Mongoose for database  
✅ CORS and dotenv integration  
✅ Organized structure (models, middleware, routes)

---

## 🧩 Tech Stack

- **Node.js** – JavaScript runtime  
- **Express.js** – Web framework  
- **MongoDB + Mongoose** – Database  
- **JWT (jsonwebtoken)** – Authentication  
- **bcrypt** – Password hashing  
- **dotenv** – Environment variable management  
- **cors** – Handle cross-origin requests  

---

## 📁 Folder Structure

project-folder/
│
├── models/
│ ├── Blog.js
│ └── user.js
│
├── middleware/
│ └── auth.js
│
├── .env
├── index.js
├── package.json
└── README.md

yaml
Copy code

---

## ⚙️ Environment Variables

Create a `.env` file in your project root and add:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Example:

env
Copy code
MONGO_URL=mongodb+srv://ratnesh-----@cluster0.mongodb.net/blogdb
JWT_SECRET=Example_key
🧠 API Endpoints
🧍‍♂️ User Authentication
POST /signup
Registers a new user.

Body (JSON):

json
Copy code
{
  "username": "ratnesh",
  "password": "123456"
}
Response:

json
Copy code
{ "msg": "Signup done" }
POST /signin
Logs in an existing user and returns a JWT token.

Body (JSON):

json
Copy code
{
  "username": "ratnesh",
  "password": "123456"
}
Response:

json
Copy code
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
📰 Blog Routes
GET /blogs
Fetch all blogs. (Public)

Response:

json
Copy code
[
  {
    "_id": "67100f13a3...",
    "title": "My First Blog",
    "description": "This is my blog post"
  }
]
POST /blogs
Create a new blog. (Requires JWT token)

Headers:

pgsql
Copy code
Authorization: Bearer <your_token>
Content-Type: application/json
Body (JSON):

json
Copy code
{
  "title": "New Blog Post",
  "description": "This is my blog content."
}
Response:

json
Copy code
{
  "_id": "6710bdf63d02f423eb8d8743",
  "title": "New Blog Post",
  "description": "This is my blog content."
}
PUT /blogs/:id
Update a blog by ID. (Requires JWT token)

Headers:

pgsql
Copy code
Authorization: Bearer <your_token>
Content-Type: application/json
Body (JSON):

json
Copy code
{
  "title": "Updated Blog Title",
  "description": "Updated description text."
}
Response:

json
Copy code
{
  "_id": "6710bdf63d02f423eb8d8743",
  "title": "Updated Blog Title",
  "description": "Updated description text."
}
DELETE /blogs/:id
Delete a blog by ID. (Requires JWT token)

Headers:

makefile
Copy code
Authorization: Bearer <your_token>
Response:

json
Copy code
{ "msg": "Deleted ✅" }
🧩 Middleware Example (auth.js)
js
Copy code
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).send("Access denied.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};
🧑‍💻 Run Locally
Clone this repository

bash
Copy code
git clone https://github.com/yourusername/blog-backend.git
cd blog-backend
Install dependencies

bash
Copy code
npm install
Add your .env file (see above)

Start the server

bash
Copy code
node index.js
or use:

bash
Copy code
nodemon index.js
Server runs on:
http://localhost:3000

📦 Dependencies
bash
Copy code
npm install express mongoose cors bcrypt jsonwebtoken dotenv
💡 Future Improvements
Blog image upload (Cloudinary)

User-specific blog ownership checks

Pagination and search

Like/comment system

🧑‍🎓 Author
Ratnesh Jatav
Web & Software Developer
📍 Ghaziabad, India
📧 ratneshjatav637@gmail.com
🔗 GitHub | LinkedIn
