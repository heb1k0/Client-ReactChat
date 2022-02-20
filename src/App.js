import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Sala from "./routes/sala";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState(0);
  const [loading, setLoading] = useState(0);
  const [isGoogle , setIsGoogle] = useState(0);

  useEffect(() => {
    let loggedUser = window.localStorage.getItem("user");
    if (loggedUser) {
      let userToken = JSON.parse(loggedUser);
      userToken.isGoogle ? setIsGoogle(true) : setIsGoogle(0);
      axios
        .post("http://localhost:3002/checkToken", { token: userToken.token })
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            setUser(userToken);
          } else {
            window.localStorage.removeItem("user");
          }
          setTimeout(() => {
            setLoading(1);
          }, 2000);
        })
        .catch((err) => {
          window.localStorage.removeItem("user");
        });
    }else{
      setLoading(1);
    }
  }, []);

  return loading ? (
    <div className="App">
      <div className="container">
        {user ? (
          <Sala handleLogout={setUser} User={user.name} idUser={user.id} isGoogle={isGoogle}></Sala>
        ) : (
          <Login setIsGoogle={setIsGoogle} handleLogin={setUser} />
        )}
      </div>
    </div>
  ) : (
    <div className="App">
      <div className="container">
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
    </div>
  );
}
