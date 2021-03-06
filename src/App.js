import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import Login from "./components/Login";
import Sala from "./routes/sala";

import Loading from "./components/Loading";


const socket = io(process.env.REACT_APP_URL);

export default function App() {
  const [user, setUser] = useState(0);
  const [loading, setLoading] = useState(1);
  const [isGoogle, setIsGoogle] = useState(0);
  return loading ? (
    <div className="App">
      {user ? (
        <Sala
          socket={socket}
          handleLogout={setUser}
          user={user}
          tokenUser={user.token}
          isGoogle={isGoogle}
          setIsGoogle={setIsGoogle}
        ></Sala>
      ) : (
        <Login
          socket={socket}
          setIsGoogle={setIsGoogle}
          handleLogin={setUser}
        />
      )}
    </div>
  ) : (
    <div className="App">
      <Loading />
    </div>
  );
}
