# 🚀 Authentication UI – React Frontend

A clean, modern, and production-ready authentication UI built using **React + Vite**, designed to work seamlessly with a backend API for login, signup, and admin management.

This project focuses on **simplicity, usability, and clean UX** — avoiding cluttered dashboards and overcomplicated templates.

---

## ✨ Features

### 🔐 Authentication
- User Signup
- User Login
- Token-based authentication (JWT ready)
- Persistent login state using Context API

### 👤 User Dashboard
- Personalized welcome section
- Real-time clock display
- Clean and minimal UI layout
- Secure session handling

### 🛠️ Admin Panel
- View all registered users
- Search users dynamically
- View platform statistics
- Change user roles (User ↔ Admin)
- Improved UX with:
  - Role badges
  - Dropdown-based role selection
  - Confirmation modal before updates

### 🎨 UI/UX Highlights
- Minimal, clean, distraction-free design
- No heavy or bloated admin templates
- Smooth layout spacing and hierarchy
- Built with scalability in mind

---

## 🧱 Tech Stack

- **Frontend Framework:** React (Vite)
- **Language:** TypeScript / JavaScript
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS (with custom setup)
- **Animations:** Framer Motion (subtle, non-intrusive)

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository


git clone https://github.com/your-username/Signup-UI.git

cd Signup-UI


### 2️⃣ Install dependencies


npm install


### 3️⃣ Configure environment

Create a `.env` file in the root:


VITE_API_BASE_URL=http://localhost:5000/api


> Make sure this matches your backend API.

### 4️⃣ Run the development server


npm run dev


---

## 🔗 Backend Integration

This frontend is designed to work with a separate backend API.

Expected endpoints:

- `POST /auth/login`
- `POST /auth/signup`
- `GET /admin/users`
- `GET /admin/stats`
- `PUT /admin/update-role`

Make sure:
- CORS is enabled on backend
- API base URL is correctly configured

---

## 🔐 Authentication Flow

1. User logs in or signs up  
2. Backend returns JWT token  
3. Token is stored in local storage / context  
4. Protected routes are enabled  
5. Admin routes are restricted based on role  

---

## 🧠 Design Philosophy

- ❌ No over-engineered UI libraries  
- ❌ No cluttered dashboards  
- ✅ Clean, readable components  
- ✅ Easy to extend and integrate  
- ✅ Focus on real-world usability  

---

## 🚧 Known Improvements (Future Scope)

- Role-based route guards (more strict)  
- Toast notifications for actions  
- Dark mode support  
- Form validation enhancements  
- Pagination in admin panel  
- Better error handling UI  

---

## 📸 Screens (Optional)

_Add screenshots here if needed_

---

## 🤝 Contribution

This project is structured to be simple and extendable.

If you want to improve:
- Keep components clean and reusable  
- Avoid unnecessary complexity  
- Follow existing folder structure  

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Abhishek Kumar**

- Full Stack Developer (React + .NET + SQL)  
- Focused on building clean and practical applications  
