import './App.css';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom'
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthContext } from "./helpers/AuthContext"
import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Coordinador from "./pages/Coordinador";
import GestionarAuxiliares from "./pages/GestionarAuxiliares";
import GestionarPersonasDependientes from "./pages/GestionarPersonasDependientes";
import ShowPersonaDependiente from "./pages/ShowPersonaDependiente"
import ShowAuxiliar from "./pages/ShowAuxiliar";
import AuxiliaresDisponibles from "./pages/AuxiliaresDisponibles";

function App() {

    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        rol: "",
        status: false,
    });

    useEffect(() => {
        axios
            .get("http://localhost:3001/users/auth", {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                if (response.data.error) {
                    setAuthState({...authState, status: false});
                } else {
                    setAuthState({
                        username: response.data.username,
                        id: response.data.id,
                        rol: response.data.rol,
                        status: true,
                    });
                    console.log(response.data.rol)
                }
            });
    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({
            username: "",
            id: 0,
            rol: "",
            status: false,
        })
    }

  return (

      <div className="App">
          <AuthContext.Provider value={{ authState, setAuthState }}>
              <Router>
                  <div className="navbar">
                      <label><Link to='/home'>Home</Link></label>
                      {authState.rol === "COORDINADOR" &&
                          <>
                              <label><Link to='/coordinador/personasDependientes'>Gestionar personas dependientes</Link></label>
                              <label><Link to='/coordinador/auxiliar'>Gestionar auxiliares</Link></label>
                          </>
                      }
                      {!authState.status ? (
                          <>
                              <label><Link to='/login'>Login</Link></label>
                          </>
                      ) : (
                          <button onClick={logout}>Logout</button>
                      )}
                      <div className="loggedInContainer">
                          <h1>{authState.username}</h1>
                      </div>

                  </div>
                  <Routes>
                      <Route path='/home' element={<Home/>} />
                      <Route path='/login' element={<Login/>} />
                      <Route path='/coordinador/personasDependientes' element={<GestionarPersonasDependientes/>} />
                      <Route path='/coordinador/auxiliar' element={<GestionarAuxiliares/>} />
                      <Route path='/auxiliares/show/:id' element={<ShowAuxiliar/>} />
                      <Route path='/personaDependiente/:id' element={<ShowPersonaDependiente/>} />
                      <Route path='/personaDependiente/:id/auxiliaresDisponibles' element={<AuxiliaresDisponibles/>} />
                  </Routes>
              </Router>
          </AuthContext.Provider>
      </div>
  );
}

export default App;
