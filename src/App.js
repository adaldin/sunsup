// React
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Header from "./components/header/Header";
import Menu from "./components/menu/Menu.js";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import UserProfile from "./components/userProfile/UserProfile";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
// Pages
import Home from "./pages/home/Home.js";
import Explore from "./pages/explore/Explore.js";
import Profile from "./pages/profile/Profile.js";
// Context
import AuthProvider from "./context/authContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/login" element={<Login />} />
            <Route path="/profile/register" element={<Register />} />
            <Route
              path="/profile/user"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Menu />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
// PAGES
// PROFILE
// Cambiar una vez logueado el cliente por sus datos  HECHO!!!

// HOME
// Renderizar listado de eventos

// -------
// COMPONENTES

// LOGIN
// gestionar error para alert

// LOADING
// Crearlo y reemplazar p de home y protected route
