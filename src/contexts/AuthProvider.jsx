import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { AuthService } from "@/apis";
import { useNavigate, useLocation } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { login, refreshAccessToken, getUserInfo} = AuthService;
  const navigate = useNavigate();
  const location = useLocation();

  const signIn = async (data) => {
    try {
      const tokens = await login(data); 
    
      localStorage.setItem("access-token", tokens.accessToken);
      localStorage.setItem("refresh-token", tokens.refreshToken);
  
      setIsLoggedIn(true);
      const userInfo = getUserInfo(tokens.accessToken);
      setUser(userInfo);
  
      // 로그인 후 리디렉션 처리
      const redirectPath = location.state?.from || PageEndPoints.HOME;
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setIsLoggedIn(false);
      console.log(err.message);
    }
  }

  const signOut = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    setIsLoggedIn(false);
    window.location.reload();
  }

  useEffect(() => {
    const refreshTokenRequest = async () => {
      let accessToken = localStorage.getItem("access-token");
      const refreshToken = localStorage.getItem("refresh-token");
  
      if (!accessToken && !refreshToken) return; 
  
      if (!accessToken && refreshToken) {
        try {
          const token = await refreshAccessToken(refreshToken); 

          console.log(token);
        
          if (token?.accessToken){
            console.log("로그인다시");
            localStorage.setItem("access-token", token.accessToken);
            localStorage.setItem("refresh-token", token.refreshToken);
            setIsLoggedIn(true);
            const userInfo = getUserInfo(token.accessToken);
            setUser(userInfo);
          }else {
            throw new Error("새로운 accessToken을 받지 못함");
          }
      
          // 로그인 후 리디렉션 처리
          const redirectPath = location.state?.from || PageEndPoints.HOME;
          navigate(redirectPath, { replace: true });
        } catch (err) {
          setIsLoggedIn(false);
          console.error("토큰 갱신 실패:", err);
          signOut();
          navigate(PageEndPoints.LOGIN, { state: { from: location.pathname } });
        }

      } else {
        console.log("로그인되어있음");
        setIsLoggedIn(true);
        const userInfo = getUserInfo(accessToken);
        setUser(userInfo);
      }
    };
  
    refreshTokenRequest();
  }, []);
  

  return (
    <AuthContext.Provider
      value={{isLoggedIn, signIn, signOut, user}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;