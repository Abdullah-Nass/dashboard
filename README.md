# 🌐 API-Driven Multilingual Dashboard — React, TypeScript & REST API

A fully functional API-driven, multilingual task management dashboard built with React, TypeScript, and Tailwind CSS. The application integrates with the DummyJSON REST API for authentication and data management, featuring JWT-based authentication, CRUD operations, optimistic UI updates, and multilingual support for English, Arabic, and Spanish with automatic RTL/LTR layout switching.

🔗 **Live Demo:** [dashboard-a-n.netlify.app](https://dashboard-a-n.netlify.app/)

---

## ✨ Features

- **Authentication** — JWT-based login with protected routes and automatic logout on token expiration
- **Posts** — View, create, and manage posts with a clean card interface
- **Todos** — View todos with toggle-complete functionality and optimistic UI updates
- **Multilingual UI** — Full i18n support for English, Arabic, and Spanish
- **RTL/LTR Support** — Automatic document direction and language switching for Arabic
- **Responsive Design** — Mobile-first layout with Tailwind CSS, tested across devices
- **Persistent Auth** — Token and user data stored in localStorage
- **Loading & Error States** — Consistent handling throughout the application
- **Remote-Friendly** — Clean, readable code for team collaboration

---

## 🛠️ Tech Stack

| Technology      | Purpose                     |
| --------------- | --------------------------- |
| React 19        | UI Library                  |
| TypeScript      | Type Safety                 |
| Tailwind CSS v4 | Styling                     |
| React Router v7 | Client-side Routing         |
| react-i18next   | Internationalization (i18n) |
| Axios           | HTTP Requests               |
| DummyJSON API   | Mock Backend                |
| Vite            | Build Tool                  |

---

## 📁 Project Structure

```text
src/
├── api/              # API request functions
├── components/       # Reusable UI components
├── context/          # Auth state management
├── i18n/
│   ├── index.ts      # i18next configuration
│   └── locales/      # Translation files (en, ar, es)
├── pages/            # Page components (Login, Profile, AddPost, AddTodo)
├── types/            # TypeScript interfaces
├── App.tsx           # Routes and protected route logic
└── main.tsx          # Entry point
```

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/Abdullah-Nass/dashboard.git
cd dashboard
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

---

## 🔑 How to Use

### Login

- **Username:** `emilys`
- **Password:** `emilyspass`

(Test credentials from DummyJSON)

### Dashboard Features

1. **Language Switcher** — Top navbar dropdown to switch between EN, AR, ES
2. **Posts** — View all posts; click "Add Post" in sidebar to create new ones
3. **Todos** — Click the checkbox to toggle todo completion (updates instantly)
4. **Logout** — Click logout in sidebar to clear token and return to login

---

## 🌍 Internationalization

Translations are organized by namespace in `src/i18n/locales/`:

- **`common.json`** — Shared UI elements (buttons, labels, errors)
- **`auth.json`** — Login page strings
- **`profile.json`** — Profile page strings
- **`add_post.json`** — Add post page
- **`add_todo.json`** — Add todo page

Each locale folder (`en/`, `ar/`, `es/`) contains these files.

> [!NOTE]
> ** Translation Workflow:** Translations were managed using the Crowdin GitHub integration combined with auto-translation. Note that the Arabic localization has been partially revised for context and accuracy, while Spanish relys primarily on the automated translation output.

### RTL Support

When Arabic is selected, the app automatically:

- Sets `document.dir = "rtl"`
- Updates `document.lang = "ar"`
- Reverses layout using Tailwind's RTL utilities

---

## 🏗️ Architecture Highlights

### Authentication Context

Auth state (user, token, login/logout) is managed globally via `AuthContext` and persisted in localStorage. Protected routes redirect unauthenticated users to `/login`.

### Optimistic UI Updates

Todos use optimistic updates — the UI updates immediately when you toggle a checkbox, then rolls back if the server request fails. This provides instant feedback without waiting for the API.

### Component Composition

Large pages are split into reusable components:

- `Navbar` — Top navigation with language switcher
- `Sidebar` — Mobile-responsive navigation
- `PostsList` / `TodoList` — Lists with card components
- `PostCard` / `TodoCard` — Individual item cards

---

## 📝 Key Design Decisions

1. **React Context over Redux** — Simpler state management for auth and login; Redux would be overkill for this scope
2. **Namespace-based i18n** — Organized translation files by feature, easier to maintain as the app grows
3. **Tailwind CSS** — Utility-first approach keeps component files clean and styling explicit
4. **Axios** — Simpler API calls than fetch with automatic JSON serialization
5. **localStorage for tokens** — Simple and effective for a client-side app; production would use secure HTTP-only cookies

---

## 🔄 API Integration

The app integrates with **DummyJSON** for all data:

- `POST /auth/login` — User authentication
- `GET /auth/me` — Fetch current user (requires token)
- `GET /posts/user/{userId}` — Fetch user's posts
- `POST /posts/add` — Create a new post
- `GET /todos/user/{userId}` — Fetch user's todos
- `PUT /todos/{id}` — Update todo (toggle completion)

Note: DummyJSON simulates POST/PUT responses; data is not persisted between sessions.

---

## 📱 Responsive Design

The layout adapts across breakpoints:

- **Mobile** — Single column, hamburger sidebar toggle
- **Tablet** — Two-column grid for posts and todos
- **Desktop** — Full-width layout with fixed sidebar

---

## 👨‍💻 Author

**Abdullah Naser**

- GitHub: [github.com/Abdullah-Nass](https://github.com/Abdullah-Nass)
- LinkedIn: [linkedin.com/in/abdullah-naser04](https://www.linkedin.com/in/abdullah-naser04)
- Portfolio: [abdullah-nass.github.io/portfolio](https://abdullah-nass.github.io/portfolio)

---

## 📄 License

This project is open source and available for educational and portfolio purposes.
