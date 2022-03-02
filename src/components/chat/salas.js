import {  useEffect } from "react";

export default function Salas(props) {
  const { socket,setuserRoom,setMessageList, salas,setSalas , userRoom, user} = props;


  const GoRoom = (id,name) => {
    setuserRoom({room:id,name});
    socket.emit("room:join", {room:id,name});
    setMessageList([]);
  };

  useEffect(() => {

    socket.on("room:joinRES", (data) => {
      console.log("room:joinRES", data);
      // setSalas(data);
    });



  }, [socket]);



  return salas.map((message, index) => {
    return (
      
      <div
        key={message._id}
        className="col-md-12 room"
        onClick={() => GoRoom(message._id, message.name)}
      >
          <p className="room-header">Sala</p>
          <p>{message.name}</p>
      </div>
    );
  });
}
