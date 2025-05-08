import './App.css'
import { Routes, Route } from "react-router";
import { createContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Home from './components/Home';
import LoginForm from "./components/Loginform";
import RegistrationForm from './components/RegistractionForm';


export const AuthContext = createContext();

function getUserFromSessionStorage() {
	const userJson = sessionStorage.getItem("user");
	const user = JSON.parse(userJson);
	return user;
}


function App() {

  const [user, setUser] = useState(getUserFromSessionStorage());

  return (
    <div>
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route index="true" element={<Home />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
				</Routes>
      </AuthContext.Provider>
    </div>
  )
}

export default App
