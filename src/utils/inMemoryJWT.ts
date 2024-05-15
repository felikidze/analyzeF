import { AuthClient, config } from "@/config/Auth";

const inMemoryJWTService = () => {
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

  const getToken = () => localStorage.getItem(config.ACCESS_STORAGE_KEY);

  const setToken = (token: string, tokenExpiration: never) => {
    localStorage.setItem(config.ACCESS_STORAGE_KEY, token);
    refreshToken(tokenExpiration);
  };

  const deleteToken = () => {
    localStorage.removeItem(config.ACCESS_STORAGE_KEY);
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