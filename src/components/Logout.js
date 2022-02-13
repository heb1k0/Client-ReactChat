import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = "1015667005546-0uu2tgbr43lgnc81ci8uh7l3srva2hh6.apps.googleusercontent.com";

function LogoutGoogle() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default LogoutGoogle;