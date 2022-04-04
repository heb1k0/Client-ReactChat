import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Register from "./Register";
import LoginGoogle from "./LoginGoogle";
import Loading from "./Loading";
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
    borderRadius: "4px",
    marginTop: "20px",
  };

  const [isLoading, setLoading] = useState(false);

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [mensajeError, setMensajeError] = useState("");
  const [landingRegister, setlandingRegister] = useState(0);

  const { handleLogin, setIsGoogle, socket } = props;

  const sendSubmit = async (e) => {
    try {
      setLoading(true);
      setMensajeError(0);


      if (username && password) {
        socket.emit("user:Login", { username, password });
      } else {
        setMensajeError("Ingrese usuario y contraseña");
      }
      setLoading(false);


    } catch (err) {
      setMensajeError("Usuario o contraseña incorrectos");
      setLoading(false);
    }
  };

  useEffect(() => {
    socket.on("user:LoginRES", (data) => {
      if (data.error || data.msj) {
        setMensajeError("Usuario o contraseña incorrectos");
      } else {
        handleLogin({
          username: data.username,
          token: data.token,
          isGoogle: false,
          id: data._id,
        });
      }
    });
  }, [handleLogin, socket]);
  return (
    <div>
      {!landingRegister ? (
        <div className="d-flex justify-content-center">
          {isLoading ? (
            <Loading />
          ) : (
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

              {mensajeError ? (
                <div className="alert alert-danger text-center">
                  {mensajeError}
                </div>
              ) : null}

              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  {...register("username", {
                    required: true,
                    onChange: (e) => setUserName(e.target.value),
                  })}
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Username"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    onChange: (e) => setPassword(e.target.value),
                  })}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Enter password"
                />
              </div>
              <div className="pt-3 text-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-block col-5"
                >
                  Login
                </button>
                <br />
                <LoginGoogle
                  socket={socket}
                  setIsGoogle={setIsGoogle}
                  handleLogin={handleLogin}
                />
                <br />
                <button
                  className="btn btn-link btn-block col-5"
                  onClick={() => setlandingRegister(1)}
                >
                  Registrarse
                </button>
                
              </div>
            </form>
          )}
        </div>
      ) : (
        <Register
          setlandingRegister={setlandingRegister}
          socket={socket}
        ></Register>
      )}
    </div>
  );
}
