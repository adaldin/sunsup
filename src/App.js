// React
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMemo, useState } from "react";
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
import LocationContext from "./context/locationContext";

function App() {
  //******STATES/
  const [locations, setLocations] = useState([]);
  //******CONTEXT/
  const value = useMemo(() => ({ locations, setLocations }), [locations]);
  return (
    <>
      <BrowserRouter>
        <LocationContext.Provider value={value}>
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
        </LocationContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
// PAGES
// PROFILE
// Cambiar una vez logueado el cliente por sus datos  HECHO!!!

// HOME/TODAY
// Tomar ubicación de clientes.
// Filtrar  array de eventos, los lugares que coinciden con ubicación de cliente
// Renderizar listado de eventos

// -------
// COMPONENTES

// LOGIN
// gestionar error para alert

// LOADING
// Crearlo y reemplazar p de home y protected route

// WEATHER
// Componente que  se le pase por props la locación y qe traiga la data necesaria

// MAPCONTAINER
// erase markers(sólo uno se borra)
