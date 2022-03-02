import React, { useState, useEffect} from "react";
import { useForm } from "react-hook-form";

export default function Register(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { socket, setlandingRegister } = props;

  const style = {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "white",
    padding: "40px",
  };

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();	
  const [mensajeError, setEnsajeError] = useState("");



  const sendForm = async (data) => {
    try {

      socket.emit("user:register", { username, email, password });
    } catch (e) {
      setEnsajeError(e.message)
    }
  };


  useEffect(() =>{

    socket.on("user:RegisterRES", (data) => {
      if(data.error){
        setEnsajeError("EL usuario o el correo electronico ya existe")
      }else{
        window.location.href = "/";
      }
    })

  })

  return (
    <div className="container divLogin" style={style}>
      <div className="row">
        <div className="col-md-12">
          <h2 className="header-chat">Register</h2>
        </div>
      </div>
      {mensajeError ? (
        <div className='alert alert-danger text-center'>{mensajeError}</div>
        ) : null}
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSubmit(sendForm)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className={`form-control ${errors.username && "is-invalid"}`}
                placeholder="Enter username"
                {...register("username", { required: true , onChange: (e) => setUserName(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                className={`form-control ${errors.username && "is-invalid"}`}
                placeholder="Enter email"
                {...register("email", { required: true , onChange: (e) => setEmail(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password && "is-invalid"}`}
                placeholder="Enter password"
                {...register("password", { required: true , onChange: (e) => setPassword(e.target.value) })}
              />
            </div>
            <div className="pt-3 text-center">
              <button type="submit" className="btn btn-primary">
                Registrarse
              </button><br/><br/>
              <button className="btn btn-danger btn-small" onClick={() => setlandingRegister(0)}>Volver atras</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
