import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { useNavigate, useLocation } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { loading, fetchData, response } = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const signIn = (data) => {
        fetchData({
        method: "POST",
        url: `${APIEndPoints.LOGIN}`,
        data: {
          email: data.id,
          password: data.password, 
        },
      }).then((res)=>{
        console.log(res);
        localStorage.setItem("access-token", res.data.accessToken);
        localStorage.setItem("refresh-token", res.data.refreshToken);
        setIsLoggedIn(true);
        userInfo(res.data.accessToken);

        const redirectPath = location.state?.from || PageEndPoints.HOME;
        navigate(redirectPath, { replace: true });

      }).catch((err) => {
        console.error(err);
        setIsLoggedIn(false);
      });
  }

  const signOut = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    setIsLoggedIn(false);
    window.location.reload();
  }

  const userInfo = async (token) => {
    fetchData({
      method: "GET",
      url: `${APIEndPoints.PROFILE}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res)=>{
      console.log(res.data);
      setUser(res.data);
    }).catch((err) => {
      console.error(err);
    });
  }

  useEffect(() => {
    const refreshTokenRequest = async () => {
      let accessToken = localStorage.getItem("access-token");
      const refreshToken = localStorage.getItem("refresh-token");
  
      if (!accessToken && !refreshToken) return; 
  
      if (!accessToken && refreshToken) {
        try {
          const res = await fetchData({
            method: "POST",
            url: `${APIEndPoints.REFRESH}`,
            data: { refreshToken },
          });
  
          if (res?.data.accessToken) {
            console.log("로그인다시");
            localStorage.setItem("access-token", res.data.accessToken);
            localStorage.setItem("refresh-token", res.data.refreshToken);
            setIsLoggedIn(true);
            userInfo(res.data.accessToken);
          } else {
            throw new Error("새로운 accessToken을 받지 못함");
          }
        } catch (error) {
          console.error("토큰 갱신 실패:", error);
          setIsLoggedIn(false);
          signOut();
          navigate(PageEndPoints.LOGIN, { state: { from: location.pathname } });
        }
      } else {
        console.log("로그인되어있음");
        setIsLoggedIn(true);
        userInfo(accessToken);
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