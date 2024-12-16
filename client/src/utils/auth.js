import { jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(token) {
    localStorage.setItem('id_token', token);
  }

  logout() {
    localStorage.removeItem('id_token');
  }
}

export default new AuthService();
