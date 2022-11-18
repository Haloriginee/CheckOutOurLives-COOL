import React from 'react';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { FcGoogle } from "react-icons/fc";
import coolVideo from "../assets/cool.mp4";
import logo from "../assets/logo.png"

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem( "User", JSON.stringify(response.credential))

    const { name, sub, picture } = jwt_decode(response.credential);
      console.log({ name, sub, picture})

    const doc = {
      _id: sub,
      _type: "User",
      userName: name,
      image: picture
    };

    client.createIfNotExists(doc)
      .then(() => {
        navigate("/", { replace: true })
      });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={coolVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
          <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={ (renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" />Sign in With Google
                </button>
              )}

              onSuccess={credentialResponse => {
                responseGoogle(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
