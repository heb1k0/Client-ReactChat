import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import LogoutGoogle from "../components/Logout";
import Mensaje from "../components/Mensaje";


const socket = io("http://139.59.149.58:3002");

export default function Sala(props) {


  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  

  const [msj, setMensaje] = useState(0);
  const [messageList, setMessageList] = useState([]);

  const { handleLogout, User } = props;

  let Input = document.getElementById("inputSend");
  var chatDiv = document.getElementById("chatDiv");

  const sendSubmit = (e) => {
    e.preventDefault();
    if(msj.length > 0){
      Input.classList.remove("is-invalid");
      socket.emit("send_message", { User, mensaje: msj });
      setMessageList((list) => [
        ...list,
        {
          user: User,
          msj,
          send: true,
        },
      ]);
      setMensaje("");
      // Div scroll chatDiv
      Input.value = "";

    }else{
      Input.classList.add("is-invalid");
    }
    chatDiv.scrollTop = chatDiv.scrollHeight;
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data)
      setMessageList((list) => [
        ...list,
        {
          user: data.User,
          msj: data.mensaje,
          send: false,
        },
      ]);


    });
  }, []);


  const Logout = () => {
    socket.emit('forceDisconnect');
    window.localStorage.removeItem("user");
    handleLogout(0);
  };

  const chatStyle = {
    height: "calc(100vh - 200px)",
    overflowY: "scroll",
  };

  return (
    //template chat
    <main className="container">
      <div className="row">
        <div className="col-md-3">
          <h2 className="header-chat">Users</h2>
          <div className="bg-white p-2 m-2">
            <div className="profile row">
              <div className="col-md-2 avatar">avatar</div>
              <div className="col-md-10">username</div>
            </div>
          </div>
          <div className="text-center">
            <p className="btn btn-danger" onClick={Logout}>
              Logout
            </p>
            <LogoutGoogle />
          </div>
        </div>

        <div className="col-md-9 overflow-hidden">
          <h2 className="header-chat">Chat</h2>
          <div id="chatDiv" className="overflow-auto" style={chatStyle} >
            {messageList.map((message, index) => {
              return (
                <Mensaje
                  key={index}
                  user={message.user}
                  mensaje={message.msj}
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
                  placeholder="Type a message"
                  onChange={(e) => setMensaje(e.target.value)}
                />
              </div>
              <div className="col-md-2 bg-white p-0 m-0">
                <input type="submit" className="btn btn-primary col-12 p-3" value="send"/>
              </div>
            </form>
        </div>
      </div>
    </main>
  );
}
