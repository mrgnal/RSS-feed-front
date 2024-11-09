const API_URL = 'http://127.0.0.1:8000/api';

export async function login(email: string, password: string) {
  // Надсилаємо POST-запит на /login/ endpoint
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');

  const response = await fetch(`${API_URL}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  // Обробляємо помилку, якщо запит не виконано успішно
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  // Отримуємо токени з відповіді
  const data = await response.json();
  const accessToken = data?.access_token;
  const refreshToken = data?.refresh_token;

  console.log('Login Response:', data);

  // Перевіряємо, чи отримали ми обидва токени
  if (accessToken && refreshToken) {
    // Перевіряємо, чи вже є токени в `localStorage`
    const currentAccessToken = getAccessToken();
    if (!currentAccessToken) {
      // Якщо токенів ще немає, зберігаємо їх у localStorage
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
  // Отримуємо access-токен з localStorage
  const accessToken = getAccessToken();

  if (!accessToken) return;

  // Отримуємо час до закінчення дії токена
  const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
  const expiresIn = tokenPayload.exp * 1000 - Date.now();

  console.log('Access Token Expires In (ms):', expiresIn);

  // Оновлюємо токен за хвилину до закінчення його дії
  const refreshInterval = Math.max(0, expiresIn - 60 * 1000);

  setTimeout(async () => {
    await refreshAccessToken();
  }, refreshInterval);
}

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}