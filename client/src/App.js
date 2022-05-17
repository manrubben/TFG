import './App.css';
import './navbar.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthContext } from "./helpers/AuthContext"
import React, {useState, useEffect} from "react";
import axios from "axios";
import CreatePersonaDependiente from "./pages/CreatePersonaDependiente";
import CreateAuxiliar from "./pages/CreateAuxiliar";
import Registro from "./pages/Registro";
import GestionarAuxiliares from "./pages/GestionarAuxiliares";
import GestionarPersonasDependientes from "./pages/GestionarPersonasDependientes";
import ShowPersonaDependiente from "./pages/ShowPersonaDependiente"
import ShowAuxiliar from "./pages/ShowAuxiliar";
import AuxiliaresDisponibles from "./pages/AuxiliaresDisponibles";
import EditPersonaDependiente from "./pages/EditPersonaDependiente";
import EditAuxiliar from "./pages/EditAuxiliar";
import PersonasDependientesAsignadas from "./pages/PersonasDependientesAsignadas";
import ShowRegistro from "./pages/ShowRegistro";
import EditRegistro from "./pages/EditRegistro";
import Welcome from "./pages/Welcome";
import Navbar from "./pages/Navbar";
import Observaciones from "./pages/Observaciones";
import CreateFamiliar from "./pages/CreateFamiliar";
import GestionarFamiliares from "./pages/GestionarFamiliares"
import ShowFamiliar from "./pages/ShowFamiliar"
import EditFamiliar from "./pages/EditFamiliar"
import FamiliaresAsignados from "./pages/FamiliaresAsignados";

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

  return (

      <div className="App">
          <AuthContext.Provider value={{ authState, setAuthState }}>
              <Router>
                  <Navbar/>
                  <Routes>
                      <Route path='/' element={<Welcome/>}/>
                      <Route path='/home' element={<Home/>} />
                      <Route path='/login' element={<Login/>} />
                      <Route path='/coordinador/personasDependientes' element={<GestionarPersonasDependientes/>} />
                      <Route path='/coordinador/personasDependientes/add' element={<CreatePersonaDependiente/>} />
                      <Route path='/coordinador/auxiliares' element={<GestionarAuxiliares/>} />
                      <Route path='/coordinador/auxiliares/add' element={<CreateAuxiliar/>}/>
                      <Route path='/coordinador/familiares' element={<GestionarFamiliares/>} />
                      <Route path='/auxiliar/:id' element={<ShowAuxiliar/>} />
                      <Route path='/auxiliar/:id/edit' element={<EditAuxiliar/>} />
                      <Route path='/personaDependiente/:id' element={<ShowPersonaDependiente/>} />
                      <Route path='/personaDependiente/:id/auxiliaresDisponibles' element={<AuxiliaresDisponibles/>} />
                      <Route path='/personaDependiente/:id/addFamiliar' element={<CreateFamiliar/>} />
                      <Route path='/personaDependiente/:id/edit' element={<EditPersonaDependiente/>}/>
                      <Route path='/personaDependiente/:id/registro' element={<Registro/>} />
                      <Route path='/personaDependiente/:id/showRegistro' element={<ShowRegistro/>} />
                      <Route path='/personaDependiente/:id/registro/edit' element={<EditRegistro/>} />
                      <Route path='/auxiliar/asignadas' element={<PersonasDependientesAsignadas/>} />
                      <Route path='/personaDependiente/:id/observaciones' element={<Observaciones/>} />
                      <Route path='/familiar/:id' element={<ShowFamiliar/>} />
                      <Route path='/familiar/:id/edit' element={<EditFamiliar/>} />
                      <Route path='personaDependiente/:id/familiares' element={<FamiliaresAsignados/>} />
                  </Routes>
              </Router>
          </AuthContext.Provider>
      </div>
  );
}

export default App;
