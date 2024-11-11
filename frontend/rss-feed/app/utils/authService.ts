const API_URL = 'http://127.0.0.1:8000/api';

export async function login(email: string, password: string) {
  // Clear any existing tokens in localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');

  try {
    const response = await fetch(`${API_URL}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      // Check for 401 Unauthorized response and display a popup error
      if (response.status === 401) {
        showErrorPopup('Unauthorized access. Please check your email or password and try again.');
      }

      throw new Error(errorData.message || 'Login failed');
    }

    // Parse response data
    const data = await response.json();
    const accessToken = data?.access_token;
    const refreshToken = data?.refresh_token;

    console.log('Login Response:', data);

    if (accessToken && refreshToken) {
      const currentAccessToken = getAccessToken();

      // Store tokens if none are currently saved
      if (!currentAccessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(data));

        setRefreshTokenTimeout();
      } else {
        console.warn('Tokens already exist in localStorage, skipping save.');
      }

      return accessToken;
    } else {
      throw new Error('Tokens are missing from the response');
    }
  } catch (error) {
    console.error('Login Error:', error);
    throw error; // Rethrow error to be handled by calling function if needed
  }
}

// Show error message using a simple popup
function showErrorPopup(message: string) {

  window.alert(message);
}


export async function googleLogin(googleResponse: any) {
  // Clear any existing tokens in localStorage before starting the login process
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');

  const { tokenId } = googleResponse;

  // Send tokenId to your backend to verify the Google token and get access and refresh tokens
  const response = await fetch(`${API_URL}/login/google/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tokenId }),
  });

  // Handle error if the response is not successful
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Google login failed');
  }

  // Get the tokens from the backend response
  const data = await response.json();
  const accessToken = data?.access_token;
  const refreshToken = data?.refresh_token;

  console.log('Google Login Response:', data);

  // Ensure both tokens are present in the response
  if (accessToken && refreshToken) {
    // Check if tokens already exist in localStorage
    const currentAccessToken = getAccessToken();
    if (!currentAccessToken) {
      // If tokens don't exist in localStorage, save them
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(data));

      // Set a timeout to refresh the access token if necessary (you will need to implement this function)
      setRefreshTokenTimeout();
    } else {
      console.warn('Tokens already exist in localStorage, skipping save.');
    }

    return accessToken;
  } else {
    throw new Error('Tokens are missing from the response');
  }
}


export function logout() {
  // Видаляємо токени з localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  // Перенаправляємо користувача на сторінку авторизації
  window.location.href = '/pages/Auth/login';
}

export async function refreshAccessToken() {
  // Отримуємо refresh-токен з localStorage
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    console.warn('No refresh token found');
    return null;
  }


  // Надсилаємо POST-запит на /jwt/refresh endpoint
  const response = await fetch(`${API_URL}/jwt/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  // Обробляємо помилку, якщо запит не виконано успішно
  if (!response.ok) {
    console.error('Failed to refresh token, logging out');
    logout();
    return null;
  }

  const data = await response.json();
  const accessToken = data?.access_token;

  if (accessToken) {


    // Перевіряємо, чи потрібно оновлювати токен
    const currentAccessToken = getAccessToken();
    if (currentAccessToken !== accessToken) {
      // Оновлюємо токен в localStorage
      localStorage.setItem('accessToken', accessToken);
      setRefreshTokenTimeout()
    } else {
      console.warn('Access token already up-to-date');
    }

    return accessToken;
  } else {
    console.error('Access token missing in refresh response');
    return null;
  }
}

export function setRefreshTokenTimeout() {
  const accessToken = getAccessToken();
  if (!accessToken) return;

  try {
    const tokenParts = accessToken.split('.');
    if (tokenParts.length !== 3) throw new Error('Invalid access token format.');

    const tokenPayload = JSON.parse(atob(tokenParts[1]));
    const expiresIn = tokenPayload.exp * 1000 - Date.now();
    console.log('Access Token Expires In (ms):', expiresIn);

    const refreshInterval = Math.max(0, expiresIn - 60 * 1000);

    setTimeout(async () => {
      await refreshAccessToken();
    }, refreshInterval);

  } catch (error) {
    console.error('Failed to parse access token payload:', error);
    logout(); // Optional: log out if token parsing fails
  }
}

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}