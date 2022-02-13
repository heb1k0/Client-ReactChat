import React from 'react';

import { GoogleLogin } from 'react-google-login';
// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = "1015667005546-0uu2tgbr43lgnc81ci8uh7l3srva2hh6.apps.googleusercontent.com";

function LoginGoogle(props) {
const { handleLogin } = props;
  const onSuccess = (res) => {


    let name = res.profileObj.name;
    let token = null;

    handleLogin({ name, token });

    window.localStorage.setItem("user", JSON.stringify({ name, token }));

    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    // refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log(clientId)
    console.error('Login failed: res:', res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default LoginGoogle;