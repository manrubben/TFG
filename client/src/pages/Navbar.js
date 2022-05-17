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
     <nav className="navbar">
         <div className="container-icon">
             <a className="primary-icon" href="/home">LOGO</a>
         </div>

         <ul className="nav-list">
             {authState.rol === "COORDINADOR" &&
                 <>
                     <li className="list-item"><Link to='/coordinador/personasDependientes'>Gestionar personas dependientes</Link></li>
                     <li className="list-item"><Link to='/coordinador/auxiliares'>Gestionar auxiliares</Link></li>
                     <li className="list-item"><Link to='/coordinador/familiares'>Gestionar familiares</Link></li>
                 </>
             }
             {authState.rol === "AUXILIAR" &&
                 <>
                     <li className="list-item"><Link to='/auxiliar/asignadas'>Mis personas asignadas</Link></li>
                 </>
             }

             {authState.rol === "FAMILIAR" &&
             <>
                 <li className="list-item"><Link to='/familiar/asignadas'>Familiares dependientes</Link></li>
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
 )
}

export default Navbar;
