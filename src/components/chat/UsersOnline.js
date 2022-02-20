import {useEffect, useState} from "react";

export default function UsersOnline(props){
    const { socket, } = props;

    const [Users, setUsers] = useState([])

    useEffect(() =>{
        socket.on("user:connectRES", (data) =>{
            console.log(data)
            setUsers(data)
        })
    }, [])	

    useEffect(() =>{
        socket.on("user:disconnect", (data) =>{
            setUsers(data)
        })
    },[])
    return(
        <div>
        <h2 className="header-chat">Usuarios online</h2>
        <div className="row">
            {Users.map((user, index) =>{
                return(
                    <div className="col-md-12 mb-3" key={index}>
                        <div className="card">
                            <div className="card-body">{user.User} ({user.room.name})</div>

                        </div>
                    </div>
                )
            }
            )}
        </div>
        </div>
    
    )
}