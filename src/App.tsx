import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import AuthContextProvider from "./context/AuthContextProvider";
import AddPost from "./pages/AddPost";
import AddtTodo from "./pages/AddTodo";
function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/add_post"
            element={
              <ProtectedRoute>
                <AddPost />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/add_todo"
            element={
              <ProtectedRoute>
                <AddtTodo />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
