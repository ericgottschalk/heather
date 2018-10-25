import HttpService from './HttpService';
import config from '../config';

class UserService {
    constructor() {
        this.httpService = new HttpService();
    }

    getById(id) {
        return this.httpService.get('api/user/get/', id);
    }

    getByUsername(username) {
        return this.httpService.get('api/user/get/', username);
    }

    register(user) {
        return this.httpService.post('api/user/register', user);
    }

    update(user){
        return this.httpService.put('api/user/update', user);
    }

    uploadProfilePicture(data){
        return this.httpService.postFormData('api/user/upload-profile-picture', data);
    }

    map(user) {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: config.ApiUrl + user.profilePictureUrl,
            city: user.city || '',
            country: user.country || '',
            phrase: user.phrase || '',
            webSite: user.webSite || '',
            projects: user.projects || ''
        }
    };
}


export default UserService;