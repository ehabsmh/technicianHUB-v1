/* eslint-disable react/prop-types */
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user] = useState({});
  const [errormsg, setErrormsg] = useState("");
  // const navigate = useNavigate();

  const decodeToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const { user } = jwtDecode(token);
      console.log(user);
      setLoggedUser(user);
      return user;
    }
  };

  const collectUserData = (e) => {
    user[e.target.name] = e.target.value;
    console.log(user);
  };

  const submitLogin = async (e, navigate) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        user
      );

      setLoading(false);
      setErrormsg("");
      localStorage.setItem("token", data.token);
      const decodedUser = decodeToken();
      console.log(decodedUser);
      if (decodedUser.role === "user") navigate("/client");
      if (decodedUser.role === "technician") navigate("/tech");
    } catch (error) {
      if (error.response) {
        setErrormsg(error.response.data.error);
      }
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    decodeToken();
  }, []);

  const refreshToken = async (oldToken) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/auth/refreshToken",
        {},
        { headers: { token: oldToken } }
      );
      const newToken = data.token;
      localStorage.setItem("token", newToken);
      decodeToken();
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem("token");
    setLoggedUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        logout,
        refreshToken,
        setLoggedUser,
        errormsg,
        submitLogin,
        collectUserData,
        loading,
        decodeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
