# 👨‍💻 Personal Portfolio

> A modern, responsive developer portfolio showcasing my projects, technical skills, certifications, coding profiles, and professional journey — with a custom admin dashboard for managing portfolio content dynamically.

<p align="center">

  <a href="YOUR_LIVE_PORTFOLIO_URL">
    <img src="https://img.shields.io/badge/🌐%20Live%20Portfolio-Visit%20Website-black?style=for-the-badge" alt="Live Portfolio">
  </a>

  <a href="https://www.linkedin.com/in/teja-katkam/">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin" alt="LinkedIn">
  </a>

  <a href="https://github.com/Tejakatkam">
    <img src="https://img.shields.io/badge/GitHub-Profile-black?style=for-the-badge&logo=github" alt="GitHub">
  </a>

</p>

---

## 📌 Overview

This is my personal developer portfolio, created to present my technical background and projects in a clean and interactive way.

Rather than building only a static portfolio, I extended it with a **custom content-management system** that allows me to update portfolio information without modifying the website's source code every time.

The portfolio includes sections for projects, skills, certifications, coding profiles, education, experience, achievements, and professional links.

---

## ✨ Key Features

* 🎨 Clean and responsive portfolio interface
* 📱 Mobile-friendly design
* 👨‍💻 Project showcase with technology details
* 🧠 AI/ML project presentation
* 🛠️ Technical skills management
* 🏆 Certifications and achievements
* 💻 Coding platform profiles
* 🔗 GitHub and LinkedIn integration
* 📄 Resume access
* 🔐 Protected admin dashboard
* ⚡ Dynamic portfolio content management
* ➕ Add, edit, delete, and reorder projects
* 📜 Manage certifications without modifying source code
* 🧩 Update skills and coding-platform information dynamically
* 🗄️ MongoDB-based content storage

---

## 🧩 Admin Dashboard

One of the main features of this portfolio is the private **Admin Dashboard**.

Instead of manually editing HTML whenever something changes, I can manage portfolio content through an authenticated dashboard.

### The dashboard allows me to:

| Section            | Operations                    |
| ------------------ | ----------------------------- |
| 👤 Profile         | Add / Edit                    |
| 💻 Projects        | Add / Edit / Delete / Reorder |
| 🛠️ Skills         | Add / Edit / Delete           |
| 🏆 Certifications  | Add / Edit / Delete / Reorder |
| 📊 Coding Profiles | Add / Edit / Delete           |
| 💼 Experience      | Add / Edit / Delete           |
| 🎓 Education       | Add / Edit / Delete           |
| 🏅 Achievements    | Add / Edit / Delete           |
| 🔗 Social Links    | Update                        |

This makes the portfolio **content-driven instead of completely hardcoded**.

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │     Public User     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Portfolio Website  │
                    │     HTML / EJS      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Node.js +        │
                    │      Express       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     MongoDB Atlas   │
                    │   Portfolio Data    │
                    └─────────────────────┘


                    ┌─────────────────────┐
                    │   Portfolio Owner   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Admin Dashboard   │
                    │    /admin/login     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │ Authentication     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     MongoDB Atlas   │
                    └─────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Tailwind CSS
* EJS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

### Authentication

* Express Session
* Environment-based secrets

### Deployment

* GitHub
* Render
* MongoDB Atlas

---

## 📂 Project Structure

```text
PORTFOLIO/
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── views/
│   ├── index.ejs
│   ├── login.ejs
│   └── admin.ejs
│
├── models/
│   ├── Profile.js
│   ├── Project.js
│   ├── Certification.js
│   ├── CodingProfile.js
│   └── Achievement.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

> The exact structure may vary depending on the current implementation.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git
* MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/Tejakatkam/PORTFOLIO.git
```

### 2. Navigate into the project

```bash
cd PORTFOLIO
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_admin_password
SESSION_SECRET=your_random_session_secret
```

### 5. Start the application

```bash
node server.js
```

The application should then be available locally at:

```text
http://localhost:3000
```

---

## 🔐 Security

Sensitive credentials are stored using environment variables rather than being hardcoded into the application.

The following information should **never be committed to GitHub**:

```text
.env
MongoDB credentials
Admin password
Session secrets
API keys
```

The `.gitignore` file should include:

```text
.env
node_modules/
```

---

## 🎯 Why I Built This

A portfolio shouldn't be something that becomes outdated every time a new project, certification, or achievement is added.

I wanted to build a system where I could:

**Build once → Deploy once → Update whenever needed.**

The admin dashboard allows me to maintain my portfolio as my skills and projects evolve, without repeatedly modifying the underlying website code.

---

## 🤖 AI-Assisted Development

This project also represents my exploration of **AI-assisted development / vibe coding**.

I used AI as a development partner to accelerate implementation, explore unfamiliar technologies, troubleshoot issues, and extend the original static portfolio into a dynamic full-stack application.

An important part of the process was not simply generating code, but understanding the architecture and technologies involved while building and improving the application.

---

## 📈 Future Improvements

* [ ] Custom domain
* [ ] Improved analytics
* [ ] Automatic GitHub project integration
* [ ] Automatic coding-platform statistics
* [ ] Image/file management through the admin dashboard
* [ ] Improved admin dashboard analytics
* [ ] Additional accessibility improvements

---

## 👨‍💻 About Me

**Katkam Teja**

AI/ML Enthusiast | Java Developer | Full-Stack Developer | Algorithmic Problem Solver

I'm interested in building practical AI and software solutions while continuously exploring modern technologies across AI/ML, full-stack development, and software engineering.

### Connect With Me

* 🔗 LinkedIn: https://www.linkedin.com/in/teja-katkam/
* 💻 GitHub: https://github.com/Tejakatkam
* 🌐 Portfolio: `YOUR_LIVE_PORTFOLIO_URL`

---

## ⭐ Support

If you find the project interesting, consider giving the repository a ⭐.

Thanks for visiting!
