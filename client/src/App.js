import './App.css';
import './navbar.css';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom'
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthContext } from "./helpers/AuthContext"
import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import CreatePersonaDependiente from "./pages/CreatePersonaDependiente";
import Auxiliar from "./pages/Auxiliar";
import Registro from "./pages/Registro";
import GestionarAuxiliares from "./pages/GestionarAuxiliares";
import GestionarPersonasDependientes from "./pages/GestionarPersonasDependientes";
import ShowPersonaDependiente from "./pages/ShowPersonaDependiente"
import ShowAuxiliar from "./pages/ShowAuxiliar";
import AuxiliaresDisponibles from "./pages/AuxiliaresDisponibles";
import EditPersonaDependiente from "./pages/EditPersonaDependiente";
import EditAuxiliar from "./pages/EditAuxiliar";
import CreateFamiliar from "./pages/CreateFamiliar"
import GestionarFamiliares from "./pages/GestionarFamiliares";
import ShowFamiliar from "./pages/ShowFamiliar";
import EditFamiliar from "./pages/EditFamiliar";


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
                  <nav className="navbar">
                      <div className="container-icon">
                          <a className="primary-icon" href="/home">LOGO</a>
                      </div>
                      <ul className="nav-list">
                          {authState.rol === "COORDINADOR" &&
                              <>
                                  <li className="list-item"><Link to='/coordinador/personasDependientes'>Personas
                                      dependientes</Link></li>
                                  <li className="list-item"><Link to='/coordinador/auxiliares'>Auxiliares</Link></li>
                                  <li className="list-item"><Link to='/coordinador/familiares'>Familiares</Link></li>
                              </>
                          }

                          {!authState.status ? (
                          <>
                              <li className="list-item"><Link to='/login'>Login</Link></li>
                          </>
                          ) : (
                              <button className="log-out" onClick={logout}>Logout</button>
                          )}
                      </ul>
                      <div className="loggedInContainer">
                          <h3>{authState.username}</h3>
                      </div>
                  </nav>

                  <Routes>
                      <Route path='/home' element={<Home/>} />
                      <Route path='/login' element={<Login/>} />
                      <Route path='/coordinador/personasDependientes' element={<GestionarPersonasDependientes/>} />
                      <Route path='/coordinador/personasDependientes/add' element={<CreatePersonaDependiente/>} />
                      <Route path='/coordinador/auxiliares' element={<GestionarAuxiliares/>} />
                      <Route path='/coordinador/familiares' element={<GestionarFamiliares/>} />
                      <Route path='/coordinador/familiares/add' element={<CreateFamiliar/>} />
                      <Route path='/auxiliar/:id' element={<ShowAuxiliar/>} />
                      <Route path='/auxiliar/:id/edit' element={<EditAuxiliar/>} />
                      <Route path='/personaDependiente/:id' element={<ShowPersonaDependiente/>} />
                      <Route path='/personaDependiente/:id/auxiliaresDisponibles' element={<AuxiliaresDisponibles/>} />
                      <Route path='/personaDependiente/:id/familiaresDisponibles' element={<CreateFamiliar/>} />
                      <Route path='/personaDependiente/:id/edit' element={<EditPersonaDependiente/>}/>
                      <Route path='/personaDependiente/:id/registro' element={<Registro/>} />
                      <Route path='/familiar/:id' element={<ShowFamiliar/>} />
                      <Route path='/familiar/:id/edit' element={<EditFamiliar/>} />
                  </Routes>
              </Router>
          </AuthContext.Provider>
      </div>
  );
}

export default App;
