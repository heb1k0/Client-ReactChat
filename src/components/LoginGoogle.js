import React ,{useEffect} from 'react';

import { GoogleLogin } from 'react-google-login';
// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = "1015667005546-0uu2tgbr43lgnc81ci8uh7l3srva2hh6.apps.googleusercontent.com";

function LoginGoogle(props) {
const { handleLogin, setIsGoogle, socket } = props;
  const onSuccess = (res) => {

    let name = res.profileObj.name;
    let token = null;

    setIsGoogle(true);
    socket.emit("user:loginGoogle", { username:name, token, email:res.profileObj.email });

  };

  useEffect(() => {
    socket.on("user:loginGoogleRES", (data) =>{
      handleLogin({ username:data.user.username, token:data.user.token, id:data._id, isGoogle:true});
    })
  })

  const onFailure = (res) => {
    console.error('Login failed: res:', res);
  };

  return (
    <div className="p-2">
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