export function getToken() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
}

export function setSession({ token, email }) {
  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
}

export function getEmail() {
  return localStorage.getItem("email");
}

export function isLoggedIn() {
  return Boolean(getToken());
}