import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = "1015667005546-0uu2tgbr43lgnc81ci8uh7l3srva2hh6.apps.googleusercontent.com";

function LogoutGoogle(props) {
  const { handleLogout,socket,setIsGoogle } = props;
  const onSuccess = () => {
    socket.emit('user:logout');
    window.localStorage.removeItem("user");
    setIsGoogle(0)
    handleLogout(0)
  };

  return (
    <div className="p-2">
      <GoogleLogout
        clientId={clientId}
        buttonText="Desconectarse"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default LogoutGoogle;