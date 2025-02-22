import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useAxios } from "@/hooks";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loading, fetchData, response } = useAxios();

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
      }).catch((err) => {
        console.error(err);
        setIsLoggedIn(false);
      });
  }

  const signOut = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    setIsLoggedIn(false); 
  }

  useEffect(() => {
    let accessToken = localStorage.getItem("access-token");
    const refreshToken = localStorage.getItem("refresh-token");
    
    if (!accessToken && !refreshToken) return;

    (async () => {
      if (!accessToken && refreshToken) {

          fetchData({
            method: "POST",
            url: `${APIEndPoints.REFRESH}`,
            data: {
              refreshToken: refreshToken,
            },
          }).then((res) => {
            localStorage.setItem("access-token", res.data.accessToken);
            localStorage.setItem("refresh-token", res.data.refreshToken);
            setIsLoggedIn(true);
          }).catch((err) => {
            console.error(err);
            signOut();
            setIsLoggedIn(false);
          });

          // if (response?.accessToken) {
          //   localStorage.setItem("access-token", response.accessToken);
          //   localStorage.setItem("refresh-token", response.refreshToken);
          // } else {
          //   signOut();
          //   return;
          // }
        // }catch (error) {
        //   console.error("토큰 갱신 실패:", error);
        //   signOut();
        // }
      }
      // 로그인 성공
      setIsLoggedIn(true);
  })

}, []);

  return (
    <AuthContext.Provider
      value={{isLoggedIn, signIn, signOut}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;