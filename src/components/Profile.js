import LogoutGoogle from "../components/Logout";

export default function Profile(props){

    const { isGoogle, Logout , handleLogout, socket} = props;

    return (
        <div className="text-center">
        {isGoogle ? (

          <LogoutGoogle socket={socket} handleLogout={handleLogout} />

        ) : (

          <p className="btn btn-danger" onClick={Logout}>
            Desconectarse
          </p>
        )}
      </div>
    );
}