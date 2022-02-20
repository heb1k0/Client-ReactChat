import { useState } from "react";
import LogoutGoogle from "../components/Logout";

export default function Profile(props){

    const { isGoogle, Logout , handleLogout} = props;

    return (
        <div className="text-center">
        {isGoogle ? (

          <LogoutGoogle handleLogout={handleLogout} />

        ) : (

          <p className="btn btn-danger" onClick={Logout}>
            Logout
          </p>
        )}
      </div>
    );
}