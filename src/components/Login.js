import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import LoginGoogle from "./LoginGoogle"
require('dotenv').config()

export default function Login(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const style = {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "white",
    padding: "40px",
  };

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const { handleLogin } = props;

  const sendSubmit = async (e) => {
    try {
      if (username && password) {
        let result = await axios.post(process.env.URL+"/login", {
          username,
          password,
        });

        let name = result.data.username;
        let token = result.data.token;

        handleLogin({ name, token });

        window.localStorage.setItem("user", JSON.stringify({ name, token }));
      } else {
        alert("Ingrese usuario y contraseña");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="d-flex justify-content-center divLogin">
      <form style={style} onSubmit={handleSubmit(sendSubmit)}>
        <div className="text-center">
          <img
            src="https://www.barcelonactiva.cat/documents/20124/389312/logoITAcademy.png/"
            alt="logo"
            className="img-fluid "
            style={{ width: "50%" }}
          />
          <h3 className="p-4 text">LOGIN CHAT</h3>
        </div>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            {...register("username", { required: true })}
            className={`form-control ${errors.username && "is-invalid"}`}
            placeholder="Enter Username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className={`form-control ${errors.password && "is-invalid"}`}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="pt-3 text-center">
          <button type="submit" className="btn btn-primary btn-block col-5">
            Login
          </button>
          <br />
          <Link to="/register" className="btn btn-link">
            Registro
          </Link> <br />
            <LoginGoogle handleLogin={handleLogin} />
        </div>
      </form>
    </div>
  );
}
