import {tokenService} from "./tokenService";
import axios from 'axios';

export const login = async (data) => {
  try {
    const response = await axios.post('http://localhost:8080/users/login', data, { 'Content-Type': 'application/json' });

    tokenService.save(response.data)

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const checkSession = async () => {
  const token = tokenService.get();

  const headers = {
    "Content-Type": "application/json",
    "JWT": token
  }
  /*const response = await axios.get("http://localhost:8080/users/session", headers);*/



}
