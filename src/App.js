import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import Login from "./components/Login";
import Sala from "./routes/sala";


const socket = io("http://139.59.149.58:3002");

export default function App() {
  const [user, setUser] = useState(0);
  const [loading, setLoading] = useState(1);
  const [isGoogle, setIsGoogle] = useState(0);

  return loading ? (
    <div className="App">
        {user ? (
          <Sala socket={socket} handleLogout={setUser} user={user} tokenUser={user.token} isGoogle={isGoogle}></Sala>
        ) : (
          <Login socket={socket} setIsGoogle={setIsGoogle} handleLogin={setUser} />
        )}
    </div>
  ) : (
    <div className="App">
        <div className="row">
          <div className="col-md-12 text-center loader">
            <img
              src="https://www.barcelonactiva.cat/documents/20124/389312/logoITAcademy.png/"
              alt="logo"
              className="img-fluid img-pulse block"
              style={{ width: "200px" }}
            />{" "}
            <br />
            <p>Loading....</p>
          </div>
        </div>
    </div>
  );
}
