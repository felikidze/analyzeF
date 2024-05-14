import {default as axios} from 'axios';

export const config = {
    API_URL: 'http://localhost:5000',
    LOGOUT_STORAGE_KEY: "logout"
};

export const AuthClient = axios.create({
  baseURL: `${config.API_URL}/auth`
});
