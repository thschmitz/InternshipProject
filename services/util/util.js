import React from 'react';
import nookies from "nookies";
import {authService} from "../../services/auth/authService.js"

export const util = {
  async sessionUserData(ctx) {
    const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
    const cookies = nookies.get(ctx)[ACCESS_TOKEN_KEY];
    
    let authResponse = await authService.session(cookies)
    authResponse = authResponse?.data?.body;
  
    const response = await authService.userData(authResponse?.id);

    return response;
  }
}