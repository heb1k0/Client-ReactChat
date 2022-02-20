import { useState, useEffect } from "react";
import axios from "axios";

export default function Salas(props) {
  const { socket,setuserRoom,setMessageList } = props;

  const [salas, setSalas] = useState([]);


  const GoRoom = (id,name) => {
    setuserRoom({room:id,name});
    socket.emit("room:join", {room:id,name});
    setMessageList([]);
  };

  useEffect(() => {

    socket.emit("rooms");

    socket.on("roomsRES", (data) => {
      setSalas(data);
    });

    socket.on("newRoomRES", (data) => {
      console.log("llega",data)
      setSalas((sala) => [...sala, data]);
      console.log(salas)
    })


  }, []);


  return salas.map((message, index) => {
    return (
      <div
        key={message._id}
        className="col-md-12 mb-3"
        onClick={() => GoRoom(message._id, message.name)}
      >
        <div className="card">
          <div className="card-body">{message.name}</div>
        </div>
      </div>
    );
  });
}
