import {Link, useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import { AuthContext } from "../helpers/AuthContext";


const Navbar = () => {

 const { authState, setAuthState } = useContext(AuthContext);
 let navigate = useNavigate();

 const logout = () => {
  localStorage.removeItem("accessToken");
  setAuthState({
   username: "",
   id: 0,
   rol: "",
   status: false,
  })
  navigate('/')
 }

 return(
     <div className="navbar">
      <label><Link to='/home'>Home</Link></label>
      {authState.rol === "COORDINADOR" &&
          <>
              <label><Link to='/coordinador/personasDependientes'>Gestionar personas dependientes</Link></label>
              <label><Link to='/coordinador/auxiliares'>Gestionar auxiliares</Link></label>
              <label><Link to='/coordinador/familiares'>Gestionar familiares</Link></label>
          </>
      }

      {authState.rol === "AUXILIAR" &&
          <>
           <label><Link to='/auxiliar/asignadas'>Mis personas asignadas</Link></label>
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
 )

}

export default Navbar;
