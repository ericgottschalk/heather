import HttpService from './HttpService';
import config from '../config';
import noavatar from '../images/no_avatar.jpg';

class UserService {
    constructor() {
        this.httpService = new HttpService();
    }

    getById(id) {
        return this.httpService.get('api/user/get/', id);
    }

    getByUsername(username) {
        return this.httpService.get('api/user/get/username/', username);
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
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePictureUrl ? config.ApiUrl + user.profilePictureUrl : noavatar,
            city: user.city || '',
            country: user.country || '',
            phrase: user.phrase || '',
            webSite: user.webSite || '',
            projects: user.projects || [],
            dateRegister: new Date(user.dateCreate).toLocaleDateString(),
            verified: user.verified
        }
    };
}


export default UserService;