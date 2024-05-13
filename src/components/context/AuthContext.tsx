import {createContext, useState, useEffect, ReactNode, FC} from "react";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Circle } from "react-preloaders";
import inMemoryJWT from "@/utils/inMemoryJWT";
import {config} from "@/config/Base";
import showErrorMessage from "@/utils/showErrorMessage";
import {UserRole} from "@components/entities/User";

export const AuthClient = axios.create({
  baseURL: `${config.API_URL}/auth`
});

export const BaseClient = axios.create({
  baseURL: `${config.API_URL}`,
});

[AuthClient, BaseClient].forEach((axiosInstance) => axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = inMemoryJWT.getToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
));

interface IAuthContext {
    data?: object,
    handleFetchProtected?: () => void,
    handleSignUp?: (data: {userName: string, password: string, email: string, role: UserRole}) => void,
    handleSignIn?: (data: {userName: string, password: string}) => void,
    handleLogOut?: () => void,
    isAppReady?: boolean,
    isUserLogged?: boolean
}

export const AuthContext = createContext<IAuthContext>({});

interface IAuthProvider {
    children: ReactNode;
}

const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [data, setData] = useState();

  const handleFetchProtected = () => {
    BaseClient.get("/protected")
      .then((res) => {
        setData(res.data);
      })
      .catch(showErrorMessage);
  };

  const handleLogOut = () => {
    AuthClient.post("/logout")
      .then(() => {
        setIsUserLogged(false);
        inMemoryJWT.deleteToken();

        setData();
      })
      .catch(showErrorMessage);
  };

  const handleSignUp = (data) => {
    AuthClient.post("/sign-up", data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;

        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true);
      })
      .catch(showErrorMessage);
  };

  const handleSignIn = (data) => {
    AuthClient.post("/sign-in", data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;

        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true);
      })
      .catch(showErrorMessage);
  };

  useEffect(() => {
    AuthClient.post("/refresh")
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);

        setIsAppReady(true);
        setIsUserLogged(true);
      })
      .catch(() => {
        setIsAppReady(true);
        setIsUserLogged(false);
      });
  }, []);

  useEffect(() => {
    const handlePersistedLogOut = (event) => {
      if (event.key === config.LOGOUT_STORAGE_KEY) {
        inMemoryJWT.deleteToken();
        setIsUserLogged(false);
      }
    };

    window.addEventListener("storage", handlePersistedLogOut);

    return () => {
      window.removeEventListener("storage", handlePersistedLogOut);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        data,
        handleFetchProtected,
        handleSignUp,
        handleSignIn,
        handleLogOut,
        isAppReady,
        isUserLogged,
      }}
    >
      {isAppReady ? (
        children
      ) : (
        <div>
          <Circle />
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;