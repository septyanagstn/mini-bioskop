import { ref } from 'vue';
import api from '@/lib/api.js';
import { clearAccessToken, getAccessToken, saveAccessToken } from '@/lib/auth-token.js';

const USER_KEY = 'cinemaku_user';

function readStoredUser() {
  try {
    const storedUser = sessionStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
}

export const currentUser = ref(readStoredUser());

function saveSession(authResponse) {
  saveAccessToken(authResponse.access_token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(authResponse.user));
  currentUser.value = authResponse.user;
}

export async function login(credentials) {
  const response = await api.post('/auth/login', credentials);
  saveSession(response.data);
  return response.data.user;
}

export async function signup(credentials) {
  const response = await api.post('/auth/signup', credentials);
  saveSession(response.data);
  return response.data.user;
}

export async function logout() {
  clearAccessToken();
  sessionStorage.removeItem(USER_KEY);
  currentUser.value = null;
}

export async function restoreSession() {
  if (!getAccessToken()) {
    currentUser.value = null;
    return false;
  }

  try {
    const response = await api.get('/auth/profile');
    currentUser.value = response.data;
    sessionStorage.setItem(USER_KEY, JSON.stringify(response.data));
    return true;
  } catch {
    await logout();
    return false;
  }
}

export function hasAccessToken() {
  return Boolean(getAccessToken());
}
