import HttpService from './HttpService';

class LoginService {
    constructor(){
        this.httpService = new HttpService();
    }

    login(username, password) {
        return this.httpService.post('api/login/authenticate', {username, password})
            .then(user => {
                if (user.token) {
                    localStorage.setItem('user', JSON.stringify(user));
                    window.location = '/profile';
                }

                return user;
            });
    }

    logout() {
        localStorage.removeItem('user');
        window.location.reload(true);
    }

    isAuthenticated(){
        return localStorage.getItem('user') != null;
    }

    getLoggedUser(){
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default LoginService;