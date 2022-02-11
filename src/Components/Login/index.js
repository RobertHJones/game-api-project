import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import css from "./Login.module.css";
import "antd/dist/antd.css";
import { Button } from "antd";

const { loginPage, header } = css;

const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <Button
          type="primary"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          {" "}
          Log Out
        </Button>
      ) : (
        <div className={loginPage}>
          <h1 className={header}>Please log in to view these deals</h1>
          <Button type="primary" onClick={() => loginWithRedirect()}>
            Log in
          </Button>
        </div>
      )}{" "}
    </div>
  );
};

export default Login;
