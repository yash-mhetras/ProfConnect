# 🚀 ProfConnect

**ProfConnect** is a professional networking web application that enables users to connect, share updates, and grow their career—just like a simplified LinkedIn. Built with the modern MERN+ stack and deployed to production, ProfConnect supports secure user authentication, post interactions, resume sharing, and intelligent connection management.


## 🧠 Core Features

### 🔐 Authentication
- Token-based secure Sign Up / Login (JWT)
- Route protection via middleware
- Passwords hashed using `bcrypt`

### 👤 User Profile
- View and update user bio, education, and work experience
- Upload profile picture (Cloudinary + Multer)
- Download uploaded resumes as PDF
- View top profiles and recent activity

### 💬 Posts & Interactions
- Create and delete posts (text + images)
- Upload post images to Cloudinary
- Like, comment, and share posts
- Fully responsive UI (Next.js + CSS)

### 🧑‍🤝‍🧑 Social Networking
- Send/Accept/Reject connection requests
- View pending requests and current connections
- Discover new profiles (2nd-degree connections)

### 📂 Resume Management
- Allow recruiters to view/download resumes

---

## ⚙️ Tech Stack

| Layer         | Tech Stack                                      |
|---------------|-------------------------------------------------|
| Frontend      | `Next.js`, `React`, `Redux Toolkit`,`Custom CSS with component-based structure` (Resonsive to all screens)           
| Backend       | `Node.js`, `Express.js`                         |
| Database      | `MongoDB`, `MongoDB Atlas`                      |
| Image Storage  | `Multer`, `Cloudinary`                          |
| Authentication| `JWT`, `bcrypt` ,`crypto`                       |
| Deployment    | `Render` (backend), `Vercel` (frontend)         |


