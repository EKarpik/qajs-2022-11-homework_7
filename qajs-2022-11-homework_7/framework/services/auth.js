import supertest from "supertest";
import config from "../config/config";

const { url } = config;

    //функция авторизации    
    const login = async ({ userName, password }) => {
    return supertest(url)
        .post('/Account/v1/Authorized')
        .set('Accept', 'application/json')
        .send({ userName, password });
}

   //функция генераци токена   
   const getAuthToken = async ({ userName, password }) => {
    const response = await fetch(`${config.url}/Account/v1/GenerateToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, password })
    })
      return {
      headers: response.headers,
      status: response.status,
      data: await response.json()
    }
  }

    //забирает токен из кеша
    const getAuthTokenInCache = async () => {
    token = await this.getAuthToken;
    return token;
    }
     
export default {
    getAuthToken,
    getAuthTokenInCache,
    login
}