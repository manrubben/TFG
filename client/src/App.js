import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthContext } from "./helpers/AuthContext"
import React, {useState, useEffect} from "react";
import axios from "axios";

function App() {

    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
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
                        status: true,
                    });
                    console.log(response.data.username)
                }
            });
    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({
            username: "",
            id: 0,
            status: false,
        })
    }

  return (

      <div className="App">
          <AuthContext.Provider value={{ authState, setAuthState }}>
              <Router>
                  <div className="navbar">
                      <label><Link to='/home'>Home</Link></label>
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
                  </Routes>
              </Router>
          </AuthContext.Provider>
      </div>
  );
}

export default App;
