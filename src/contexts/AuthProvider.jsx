import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signIn = () => {
    fetchData({
            method: "POST",
            url: `${APIEndPoints.LOGIN}`,
            data: {
              email: data.id,
              password: data.password, 
            }
          })
  }

  const signOut = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;