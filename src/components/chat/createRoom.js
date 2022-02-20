import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function Createroom(props) {

    const { socket, createSala, setcreateSala, userRoom } = props;


    const [sala, setSala] = useState("");



    const formRoom = async (e) => {
        e.preventDefault();

        console.log("submit")

        try {

            setcreateSala(1);

            if (createSala) {

                if (!sala) {
                    return document.getElementById("FormRoom").classList.add("is-invalid");
                } else {
                    document.getElementById("FormRoom").classList.remove("is-invalid");
                    document.getElementById("FormRoom").classList.add("is-valid");
                }

                // let result = await axios.post("http://localhost:3002/createroom", {sala} )

                socket.emit("newRoom", { sala });

                setcreateSala(0)


            }

        } catch (e) {
            document.getElementById("FormRoom").classList.add("is-invalid");
            document.getElementById("FormRoom").value = "";
            console.log(e.message);
        }


    }

    const cancelForm = () => {
        setcreateSala(0)
    }


    return (
        <div className="col-12 p-2">

                {createSala ? (
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
                    <h2 className="header-sala text-black">Chat {userRoom.name ? userRoom.name : "General"}</h2>
                )}
        </div >
    )
}