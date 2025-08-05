# 📚 Study Companion App

A full-stack Study Companion app designed to help students organize their academic life by managing **subjects**, **notes**, and keeping track of recent updates through a **dashboard**. Built with **React (Vite)**, **Django REST Framework**, **React Query**, and **JWT authentication**.

---

Features

- User Authentication (JWT)
- Subject and Notes Management
- Dashboard with recent updates
- Calendar view integration
- Clean UI/UX with responsive design
- API data fetching with React Query

---

## 🖥️ Tech Stack

### 🔧 Frontend
- **React (Vite)**
- **React Router**
- **React Query** (for API state management)

### 🐍 Backend
- **Django**
- **Django REST Framework**
- **JWT Authentication (SimpleJWT)**

---

## 📦 Project Structure

### Frontend

```

src/
├── components/
├── pages/
├── context/           # AuthContext
├── services/          # API calls
├── App.jsx
├── main.jsx

```

### Backend

```

backend/
├── api/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
├── users/
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   ├── urls.py
├── settings.py

````

---

## 🔑 Authentication Flow

* Users log in via JWT.
* Access tokens are stored in memory or localStorage (depending on implementation).
* Protected routes are handled with React Router + AuthContext.

---

## 📊 Dashboard Overview

* Displays **latest subjects** (title, date created, note count).
* Displays **latest 10 notes** (title, updated date).
* Dynamic and responsive using `grid` layout.
* Calendar placeholder integrated for future scheduling features.

---

## 📌 API Endpoints

| Endpoint               | Method   | Description                    |
| ---------------------- | -------- | ------------------------------ |
| `/api/register/`       | POST     | Register new user              |
| `/api/token/`          | POST     | Login and get JWT tokens       |
| `/subjects/`           | GET/POST | Get or create subjects         |
| `/notes/`              | GET/POST | Get or create notes            |
| `/dashboard/subjects/` | GET      | Preview subjects for dashboard |
| `/dashboard/notes/`    | GET      | Preview notes for dashboard    |

---

## 🧪 Testing

You can test endpoints using tools like:

* [Postman](https://www.postman.com/)
* [Insomnia](https://insomnia.rest/)

---

## 📚 Future Improvements

* ✅ Add calendar-based scheduling/reminders
* ✅ Tagging and filtering notes
* ✅ Rich text editor for note content
* ✅ User profile customization

## 🙋‍♂️ Author

**Paduga Jeg A.**
*Bachelor of Science in Computer Science*

* LinkedIn: www.linkedin.com/in/paduga-jeg-a-49b629349


