import React from 'react';
import axios from 'axios';

import { GoogleLogin } from 'react-google-login';
// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = "1015667005546-0uu2tgbr43lgnc81ci8uh7l3srva2hh6.apps.googleusercontent.com";

function LoginGoogle(props) {
const { handleLogin, setIsGoogle } = props;
  const onSuccess = (res) => {

    let name = res.profileObj.name;
    let token = null;

    handleLogin({ name, token });
    setIsGoogle(true);

    axios
        .post("http://localhost:3002/registergoogle",  res )
        .then((res) => {
                handleLogin({ name, token:res.data.token,id:res.data._id });
                window.localStorage.setItem("user", JSON.stringify({ name, token:res.data.token, isGoogle:true , id:res.data._id }));
        })
        .catch((err) => {
          console.log(err)
          window.localStorage.removeItem("user");
        });

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