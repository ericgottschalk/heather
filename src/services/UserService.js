import HttpService from './HttpService';

class UserService {
    constructor(){
        this.httpService = new HttpService();
    }

    getById(id) {   
        return this.httpService.get('api/user/get/', id);
    }
    
    register(user) {
        return this.httpService.post('api/user/register', user);
    }
}

export default UserService;