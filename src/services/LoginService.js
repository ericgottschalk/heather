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
                    window.location = '/edit-profile';
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

    redirectToLoginIfNotAuthenticated(){
        if (!this.isAuthenticated()){
            window.location = '/login';
        }
    }

    getLoggedUser(){
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default LoginService;