// React
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Header from "./components/header/Header";
import Menu from "./components/menu/Menu.js";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
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
          </Routes>
          <Menu />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
