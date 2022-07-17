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

// PROBLEMAS
// funcionalidades
// Protected routes agrega una ruta. User debería tomar /profile cuando está logueado
// FormCreateEvent:Atendees tiene que tomar current email, ir a db, buscar email, y traer user.fName
// MapContainer: erase markers(sólo uno se borra) HECHO!!!
// MapContainer:Markers creation, convert locations to addresess and send it to gral context.
// MapContainer: Remove Map controls.
// Login: gestionar mensaje de error para alert
// Login: gestionar la carga del usuario cuando está leyendo el contexto por un loading y set time out
// Today(pages): debe tomar ubicación de cliente,y mapear db con docs con eventDate de hoy cerca de sus coordenadas
// Today(pages):a cada evento recibido de db, le debe agregar fetch a openWeather con current weather
// Today(pages):useParams para abrir evento id
// Today(pages): en detail de evento(id) cargar windy
//

// ui
// Drag n drom drawer over map
// MapContainer: Form over should be over
//CreateEvent/FormCreateEvent: Loader spiner está en el más y no en un div
// Menu: fixed bottom
