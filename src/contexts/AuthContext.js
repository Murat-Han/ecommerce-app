import { useState, createContext, useContext, useEffect } from "react";
import { FetchLogOut} from "../api/apiRequests";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({role:"admin"});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (() => {
      try {
       // const me = await FetchMe();
        setIsLoggedIn(true);
        setUser({role:"admin"});
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    })();
  }, []);

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user);

    localStorage.setItem("access-token", data.accessToken);
    localStorage.setItem("refresh-token", data.refreshToken);
  };

  const handleLogout=async()=>{
    setIsLoggedIn(false);
    setUser(null);

    await FetchLogOut();
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");

  }

  const values = {
    user,
    isLoggedIn,
    handleLogin,
    handleLogout,
  }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
