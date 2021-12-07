import React, { useContext, useState, useCallback, useEffect } from "react";

let logoutTimer;

const LoginContext = React.createContext({
  id: "",
  token: "",
  isLoggedIn: false,
  isAdmin: false,
  login: (token) => {},
  logout: () => {},
  admin: (role) => {},
});
const calcRemTime = (expirationTime) => {
  return "empty";
};

const retrieveStoredToken = () => {
  const token = localStorage.getItem("USER_KEY");
  const expirationDuration = localStorage.getItem("expirationTime");
  const role = localStorage.getItem("USER_ROLE");

  const remTime = calcRemTime(expirationDuration);

  if (remTime <= 3600) {
    localStorage.removeItem("USER_KEY");
    localStorage.removeItem("USER_ROLE");
    localStorage.removeItem("expirationTime");
    console.log("here");
    return null;
  }

  return {
    storedToken: token,
    storedExpTime: remTime,
    storedRole: role,
  };
};

export const LoginContextProvider = (props) => {
  //   const storedData = retrieveStoredToken();
  const [id, setId] = useState(localStorage.getItem("USER_ID"));
  const [token, setToken] = useState(localStorage.getItem("USER_KEY"));
  const [isAdmin, setIsAdmin] = useState(false);

  // is token empty string  then false
  const userIsloggedIn = !!token;

  const logoutHandler = useCallback(() => {
    localStorage.removeItem("USER_KEY");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("USER_ROLE");
    localStorage.removeItem("USER_ID");
    setToken(null);
    setIsAdmin(false);

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (userId, tok, expirationTime) => {
    localStorage.setItem("USER_ID", userId);
    localStorage.setItem("USER_KEY", tok);
    localStorage.setItem("expirationTime", expirationTime);
    setToken(tok);
    console.log(token);
    const remTime = calcRemTime(expirationTime);
    console.log(remTime);
    // logoutTimer = setTimeout(logoutHandler, remTime);
  };

  const adminHandler = (role) => {
    if (role === "ADMIN") {
      setIsAdmin(true);
      localStorage.setItem("USER_ROLE", true);
    } else {
      setIsAdmin(false);
      localStorage.setItem("USER_ROLE", false);
    }
  };

  //   useEffect(() => {
  //     if (storedData) {
  //       console.log(storedData.storedExpTime);
  //       logoutTimer = setTimeout(logoutHandler, storedData.storedExpTime);
  //     }
  //   }, [storedData, logoutHandler]);

  const contextValue = {
    id: id,
    token: token,
    isLoggedIn: userIsloggedIn,
    isAdmin: isAdmin,
    login: loginHandler,
    logout: logoutHandler,
    admin: adminHandler,
  };
  return (
    <LoginContext.Provider value={contextValue}>
      {props.children}
    </LoginContext.Provider>
  );
};
export default LoginContext;
