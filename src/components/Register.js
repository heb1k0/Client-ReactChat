import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
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

  const sendForm = async (data) => {
    try {
      let ResultRegister = await axios.post("http://localhost:3002/register", {
        username,
        password,
      });
      console.log(ResultRegister.data);
    } catch (e) {
      console.log("Error -> ", e);
    }
  };

  return (
    <div className="container divLogin" style={style}>
      <div className="row">
        <div className="col-md-12">
          <h2 className="header-chat">Register</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSubmit(sendForm)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className={`form-control ${errors.username && "is-invalid"}`}
                placeholder="Enter username"
                {...register("username", { required: true })}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password && "is-invalid"}`}
                placeholder="Enter password"
                {...register("password", { required: true })}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="pt-3 text-center">
              <button type="submit" className="btn btn-primary">
                Registrarse
              </button><br/>
              <small className="form-text text-muted"><Link to="/">Volver atras.</Link></small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
