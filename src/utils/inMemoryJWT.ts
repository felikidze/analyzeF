import { AuthClient, config } from "@/config/Auth";

const inMemoryJWTService = () => {
  let inMemoryJWT: null = null;
  let refreshTimeoutId: number | null | undefined = null;

  const refreshToken = (expiration: number) => {
    const timeoutTrigger = expiration - 10000;

    refreshTimeoutId = setTimeout(() => {
      AuthClient.post("/refresh")
        .then((res) => {
          const { accessToken, accessTokenExpiration } = res.data;
          setToken(accessToken, accessTokenExpiration);
        })
        .catch(console.error);
    }, timeoutTrigger);
  };

  const abortRefreshToken = () => {
    if (refreshTimeoutId) {
      clearTimeout(refreshTimeoutId);
    }
  };

  const getToken = () => inMemoryJWT;

  const setToken = (token: null, tokenExpiration: never) => {
    inMemoryJWT = token;
    refreshToken(tokenExpiration);
  };

  const deleteToken = () => {
    inMemoryJWT = null;
    abortRefreshToken();
    localStorage.setItem(config.LOGOUT_STORAGE_KEY, String(Date.now()));
  };

  return {
    getToken,
    setToken,
    deleteToken,
  };
};

export default inMemoryJWTService();