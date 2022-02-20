import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Mensaje from "../components/Mensaje";
import Profile from "../components/Profile";
import Createroom from "../components/chat/createRoom";
import Salas from "../components/chat/salas";
import UsersOnline from "../components/chat/UsersOnline";


import axios from "axios";


const socket = io("http://localhost:3002");

export default function Sala(props) {


  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };


  const [mensaje, setMensaje] = useState(0);
  const [messageList, setMessageList] = useState([]);
  const [createSala, setcreateSala] = useState(0);
  const [userRoom, setuserRoom] = useState(0)

  const handleSala = () =>{
    setcreateSala(!createSala);
    console.log(createSala)
  }



  const { handleLogout, User, idUser, isGoogle } = props;



  let Input = document.getElementById("inputSend");
  var chatDiv = document.getElementById("chatDiv");

  const sendSubmit = (e) => {
    e.preventDefault();
    if (mensaje.length > 0) {
      Input.classList.remove("is-invalid");

        socket.emit("send_message", { User, idUser, mensaje, room:userRoom });
        setMessageList((list) => [
          ...list,
          {
            user: User,
            mensaje,
            send: true,
          },
        ]);

      setMensaje("");
      // Div scroll chatDiv
      Input.value = "";

    } else {
      Input.classList.add("is-invalid");
    }
    chatDiv.scrollTop = chatDiv.scrollHeight;
  };
  useEffect(() => {
    socket.emit("user:connect", { User, idUser });
  }, []);


  useEffect(() => {


      socket.on("receive_message", (data) => {
        console.log(data)
        setMessageList((list) => [
          ...list,
          {
            user: data.user.User,
            idUser: data.user.idUser,
            mensaje: data.mensaje,
            send: false,
          },
        ]);


      });



  }, []);




  const Logout = () => {
    socket.emit('forceDisconnect');
    window.localStorage.removeItem("user");
    handleLogout(false);
    console.log("Diconnect")
  };

  const chatStyle = {
    height: "calc(100vh - 200px)",
    overflowY: "scroll",
  };

  return (
    //template chat
    <main className="container">
      <div className="d-flex justify-content-end">
        <Profile isGoogle={isGoogle} handleLogout={handleLogout} Logout={Logout}></Profile>
      </div>
      <div className="row container-chat">
        <div className="col-md-3">
          <h2 className="header-chat">Salas <button type="submit" className="btn btn-primary" alt="Crear Chat"  tittle="Crear Chat" onClick={handleSala}>+</button></h2>

          <Salas setuserRoom={setuserRoom} setMessageList={setMessageList} socket={socket}></Salas>


        </div>

        <div className="col-md-6 overflow-hidden bg-white">

          <Createroom userRoom={userRoom} createSala={createSala} setcreateSala={setcreateSala} socket={socket}></Createroom>


          <div id="chatDiv" className="overflow-auto" style={chatStyle} >
            {messageList.map((message, index) => {
              return (
                <Mensaje
                  key={index}
                  user={message.user}
                  mensaje={message.mensaje}
                  send={message.send}
                ></Mensaje>
              );
            })}

            <AlwaysScrollToBottom />

          </div>
          <form className="row p-2 m-0" onSubmit={sendSubmit}>
            <div className="col-md-10 bg-white p-0 m-0">
              <input
                type="text"
                id="inputSend"
                className="form-control p-3 border-0"
                placeholder="Escribe un mensaje"
                onChange={(e) => setMensaje(e.target.value)}
              />
            </div>
            <div className="col-md-2 bg-white p-0 m-0">
              <input type="submit" className="btn btn-primary col-12 p-3" value="ENVIAR" />
            </div>
          </form>
        </div>
        <div className="col-md-3">
          <UsersOnline socket={socket}></UsersOnline>
        </div>
      </div>
    </main>
  );
}
