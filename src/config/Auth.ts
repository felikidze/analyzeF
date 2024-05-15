import {default as axios} from 'axios';

export const config = {
    API_URL: 'http://localhost:5000',
    LOGOUT_STORAGE_KEY: "logout",
    ACCESS_STORAGE_KEY: "BAccessToken"
};

export const AuthClient = axios.create({
    baseURL: `${config.API_URL}/auth`,
    withCredentials: true,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
});
