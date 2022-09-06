import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

export default function LoginGoogle() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "977426575564-mr9feg9iihf0jeq0i4p3i439jrcftgma.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (response) => {
    console.log("SUCCESS", response);
  };
  const onFailure = (response) => {
    console.log("FAILED", response);
  };

  return (
    <div>
      <GoogleLogin
        clientId={
          "977426575564-mr9feg9iihf0jeq0i4p3i439jrcftgma.apps.googleusercontent.com"
        }
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}
