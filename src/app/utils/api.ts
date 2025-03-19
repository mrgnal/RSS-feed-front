import { getAccessToken, refreshAccessToken, logout } from './authService';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    let accessToken = getAccessToken();
  
    if (!accessToken) {
      console.warn('No access token found, attempting refresh...');
      accessToken = await refreshAccessToken();
  
      if (!accessToken) {
        logout();
        return;
      }
    }
  
    let response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (response.status === 401) {
      console.warn('Access token expired, refreshing...');
      accessToken = await refreshAccessToken();
  
      if (!accessToken) {
        logout();
        return;
      }
  
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  
    return response;
  }
