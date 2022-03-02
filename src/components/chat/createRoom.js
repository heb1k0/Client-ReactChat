import React from 'react';
import { useState, useEffect} from 'react';

export default function Createroom(props) {

    const { socket, createSala, setcreateSala,setuserRoom, userRoom ,setMessageList, setSalas, salas} = props;


    const [sala, setSala] = useState("");


    const goGeneral = () => {
        socket.emit("room:join", { room: "general", name: "General" , exit:true});
        setSala("General");
        setMessageList([]);
        setuserRoom({room:"general",name:"General"});    
    }
    useEffect(() =>{
        socket.on("newRoomRES", data =>  {
            setSalas((salas) => [...salas,data]);
        });
    },[])



    const formRoom = async (e) => {
        e.preventDefault();
        try {

            setcreateSala(1);

            if (createSala) {

                if (!sala) {
                    return document.getElementById("FormRoom").classList.add("is-invalid");
                } else {
                    document.getElementById("FormRoom").classList.remove("is-invalid");
                    document.getElementById("FormRoom").classList.add("is-valid");
                }

                socket.emit("newRoom", { sala });

                setcreateSala(0)


            }

        } catch (e) {
            document.getElementById("FormRoom").classList.add("is-invalid");
            document.getElementById("FormRoom").value = "";
        }


    }

    const cancelForm = () => {
        setcreateSala(0)
    }



    return (
        <div className="col-12 p-2">

            {createSala? (
                <div className="row bg-light p-2">
                    <form className="col-md-10" onSubmit={formRoom}>
                        <div className="row">
                            <div className="col-md-10">
                                <input className="form-control col-12" type="text" id="FormRoom" placeholder="Nombre de la sala" onChange={(e) => setSala(e.target.value)} />
                            </div>
                            <div className="col-md-2">
                                <input type="submit" className="btn btn-primary" alt="Crear Chat" tittle="Crear Chat" value="Crear" />
                            </div>

                        </div>
                    </form>
                    <div className="col-md-2">
                        <button className="btn btn-danger" onClick={cancelForm}>X</button>
                    </div>
                </div>


            ) : (
                <div className="row">
                    <div className={userRoom.room !== "general" ? "col-md-10" : "col-md-12"}>
                        <h2 className="header-sala text-black">Chat {userRoom.name ? userRoom.name : "General"}</h2>
                    </div>
                    {userRoom.room !== "general"  ? (
                    <div className="col-md-2 p-3">
                        {userRoom.name ? <div onClick={goGeneral} className="btn btn-danger pull-right">Salir</div> : ""}
                    </div>
                    ) : ""}
                </div >
            )
            }

        </div>
    )
}