import HttpService from './HttpService';
import noimage from '../images/no-image.jpg';
import config from '../config';

class ProjectService {
    constructor(){
        this.httpService = new HttpService();
    }

    getNewest() {   
        return this.httpService.get('api/project/newest/');
    }

    getTopRated() {   
        return this.httpService.get('api/project/top-rated/');
    }

    getMostPopular() {   
        return this.httpService.get('api/project/most-popular/');
    }

    getById(id) {   
        return this.httpService.get('api/project/get/', id);
    }

    getByUserId(userId){
        return this.httpService.get('api/project/user/', userId);
    }

    getByUsername(username){
        return this.httpService.get('api/project/user/', username);
    }

    getByHash(hash){
        return this.httpService.get('api/project/hash/', hash);
    }

    getByHashForEdit(idUser, hash){
        return this.httpService.get('api/project/for-edit/' + idUser + '/', hash);
    }
    
    save(project) {
        return this.httpService.post('api/project/save', project);
    }

    getGenres(){
        return this.httpService.get('api/project/genres/').then(data => { return data.map(genre => ({ value: genre.id, label: genre.name, key: genre.id }))} );
    }

    getPlatforms(){
        return this.httpService.get('api/project/platforms/').then(data => { return data.map(platform => ({ value: platform.id, label: platform.name, key: platform.id }))} );
    }

    uploadCoverImage(data){
        return this.httpService.postFormData('api/project/upload-cover-image', data);
    }

    contribue(data){
        return this.httpService.post('api/project/contribue', data);
    }

    getUserContribuition(idUser, idProject){
        return this.httpService.get('api/project/get-user-contribuition/' + idUser + '/', idProject);
    }

    feedback(data){
        return this.httpService.post('api/project/feedback', data);
    }

    getUserFeedback(idUser, idProject){
        return this.httpService.get('api/project/get-user-feedback/' + idUser + '/', idProject);
    }

    getFeedbacks(idProject){
        return this.httpService.get('api/project/get-feedbacks/', idProject);
    }

    mapSingle(proj){
        let percent = parseInt(proj.reachedBudget * 100 / proj.budget);

        return {
            id: proj.id,
            name: proj.name,
            description: proj.description,
            coverUrl: proj.coverUrl != null ? proj.coverUrl : noimage,
            platforms: proj.platformsRaw || [],
            genre: proj.genre.name,
            date: proj.dateCreated,
            idUser: proj.user.id,
            username: proj.user.username,
            userIsVerified: proj.user.verified,
            hash: proj.hash,
            webSite: proj.webSite,
            images: this.mapMedia(proj.coverUrl),
            reachedBudget: proj.reachedBudget,
            budget: proj.budget,
            reachedBudgetPercent: percent
        };
    }

    map(projects){
        return projects.map(proj => {
            return this.mapSingle(proj);
        }) || [];
    }

    mapMedia(coverUrl){
        if (coverUrl == null){
            return [{
                original: noimage,
                thumbnail: noimage,
            }];
        }

        return [{
            original: config.ApiUrl + coverUrl,
            thumbnail: config.ApiUrl + coverUrl,
        }]
    }
}

export default ProjectService;