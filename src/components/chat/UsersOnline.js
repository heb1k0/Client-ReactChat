export default function UsersOnline(props){

    const { Users } = props;

    return(
        <div>
        <h2 className="header-chat">Usuarios online</h2>
        <div className="row">
            {Users.map((user, index) =>{
                if(user.username && user.room.name){
                return(
                    <div className="col-md-12 mb-3 user-online" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <small className="user-header">Usuario:</small><br/>
                                {user.username}<br/>
                                <small className="user-header">Sala:</small><br/>
                                {user.room.name}
                            </div>
                        </div>
                    </div>
                )
                }
            }
            )}
        </div>
        </div>
    
    )
}