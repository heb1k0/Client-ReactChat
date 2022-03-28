/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import Mensaje from "../components/Mensaje";
import Profile from "../components/Profile";
import Createroom from "../components/chat/createRoom";
import Salas from "../components/chat/salas";
import UsersOnline from "../components/chat/UsersOnline";

export default function Sala(props) {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  const [mensaje, setMensaje] = useState(0);
  const [messageList, setMessageList] = useState([]);
  const [createSala, setcreateSala] = useState(0);
  const [userRoom, setuserRoom] = useState({
    room: "general",
    name: "General",
  });
  const [salas, setSalas] = useState([]);
  const [Users, setUsers] = useState([]);

  const handleSala = () => {
    setcreateSala(!createSala);
    console.log("createsala", createSala);
  };

  const { handleLogout, user, tokenUser, isGoogle, socket } = props;

  let Input = document.getElementById("inputSend");
  var chatDiv = document.getElementById("chatDiv");

  const sendSubmit = (e) => {
    e.preventDefault();
    if (mensaje.length > 0) {
      Input.classList.remove("is-invalid");

      socket.emit("send_message", {
        user: user.username,
        tokenUser,
        mensaje,
        room: userRoom,
      });
      setMessageList((list) => [
        ...list,
        {
          user: user.username,
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
    socket.emit("chat:refresh");

    socket.on("chat:list", (data) => {
      data.chats.forEach((item) => {
        let send = user.username === item.username ? true : false;
        setMessageList((list) => [
          ...list,
          {
            user: item.username,
            mensaje: item.mensaje,
            send,
          },
        ]);
      });
      data.room.forEach((item) => {
        setSalas((sala) => [...sala, item]);
      });
    });
  }, []);

  useEffect(() => {
    if (userRoom) {
      socket.emit("chat:changeRoom", { userRoom });
      socket.on("chat:changeRoom", (data) => {
        setMessageList([]);
        data.chats.forEach((chat) => {
          let send = chat.username === user.username ? true : false;

          setMessageList((list) => [
            ...list,
            {
              user: chat.username,
              mensaje: chat.mensaje,
              send,
            },
          ]);
        });
      });
    }
  }, [userRoom]);

  useEffect(() => {
    socket.on("user:connectRES", (data) => {
      console.log("user:connectRES", data);
      setUsers(data);
    });

    socket.on("user:disconnect", (data) => {
      console.log("user:disconnect", data);
      setUsers(data);
    });

    socket.on("user:LogoutRES", (data) => {
      console.log("user:LogoutRES", data);
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("receive_message", data);
      setMessageList((list) => [
        ...list,
        {
          user: data.user.username,
          idUser: data.user.idUser,
          mensaje: data.mensaje,
          send: false,
        },
      ]);
    });
  }, []);

  const Logout = () => {
    socket.emit("user:logout");
    window.localStorage.removeItem("user");
    handleLogout(0);
  };

  const chatStyle = {
    height: "calc(100vh - 200px)",
    overflowY: "scroll",
  };

  return (
    //template chat
    <main className="row">
      <div className="p-2">
        <Profile
          socket={socket}
          isGoogle={isGoogle}
          handleLogout={handleLogout}
          Logout={Logout}
        ></Profile>
      </div>
      <div className="row container-chat">
        <div className="col-md-2">
          <h2 className="header-chat">
            Salas
            <button
              type="submit"
              className="btn btn-primary"
              alt="Crear Chat"
              tittle="Crear Chat"
              onClick={handleSala}
            >
              +
            </button>
          </h2>

          <div className="p-2">

          <Salas
            name={user.username}
            id={userRoom.room}
            salas={salas}
            setSalas={setSalas}
            setuserRoom={setuserRoom}
            setMessageList={setMessageList}
            socket={socket}
          ></Salas>

          </div>

        </div>

        <div className="col-md-8 overflow-hidden bg-white">
          <Createroom
            userRoom={userRoom}
            setuserRoom={setuserRoom}
            setMessageList={setMessageList}
            createSala={createSala}
            setSalas={setSalas}
            setcreateSala={setcreateSala}
            socket={socket}
          ></Createroom>

          <div id="chatDiv" className="overflow-auto" style={chatStyle}>
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
              <input
                type="submit"
                className="btn btn-primary col-12 p-3"
                value="ENVIAR"
              />
            </div>
          </form>
        </div>
        <div className="col-md-2">
          <UsersOnline Users={Users} socket={socket}></UsersOnline>
        </div>
      </div>
    </main>
  );
}
