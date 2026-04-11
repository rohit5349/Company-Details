# 🚀 Company Details Management App

A full-stack MERN (MongoDB, Express, React, Node.js) application that allows authenticated users to manage company data. This project demonstrates CRUD operations with secure authentication and a responsive frontend with animations.

---

## 📌 Features

### 🔐 Authentication

* User Signup & Login using JWT
* Secure routes (only authenticated users can access protected features)
* Session handling using tokens

### 🏢 Company Management (CRUD)

* ➕ Add new company details
* 📄 View all companies (only if logged in)
* ✏️ Update company information
* ❌ Delete company from database

### 📊 Data Handling

* All company data is stored in MongoDB
* Real-time updates reflected in UI

### 🎨 Frontend UI

* Built with React + Vite
* Responsive design
* Smooth animations using Intersection Observer

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB

### DevOps

* Docker (Frontend + Backend containers)

---

## ⚙️ Project Structure

```
Company-Details/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   ├── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## 🚀 How It Works

1. User signs up or logs in
2. JWT token is generated and stored
3. Only authenticated users can:

   * Add company data
   * View company list
   * Update/Delete company
4. Data is stored in MongoDB
5. UI updates dynamically based on actions

---

## 🐳 Running with Docker

### Step 1: Build & Run

```
docker-compose up --build
```

### Step 2: Access App

* Frontend → [http://localhost:80](http://localhost:80)
* Backend → [http://localhost:5000](http://localhost:5000)

---

## 🔐 Environment Variables

Create a `.env` file in backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Frontend `.env`:

```
VITE_BACKEND_URL=http://localhost:5000
```

---

## 📸 Key Functionalities

* Login required to access company data
* Form-based company creation
* Protected routes using JWT
* Update/Delete directly from UI
* Animated cards for better UX

---

## 🎯 Learning Outcomes

* Full-stack development (MERN)
* Authentication using JWT
* REST API design
* Docker containerization
* State management in React

---

## 📌 Future Improvements

* Role-based authentication
* Image upload for companies
* Pagination & search
* Deployment on cloud (AWS / Render)

---

## 👨‍💻 Author

Rohit Singh Maurya

---

## ⭐ If you like this project

Give it a star on GitHub ⭐ and feel free to contribute!
