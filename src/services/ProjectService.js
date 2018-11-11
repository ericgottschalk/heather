import HttpService from './HttpService';
import noimage from '../images/no-image.jpg';

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

    mapSingle(proj){
        return {
            id: proj.id,
            name: proj.name,
            description: proj.description,
            coverUrl: proj.coverUrl != null ? proj.coverUrl : noimage,
            platforms: proj.platformsRaw || [],
            genre: proj.genre.name,
            date: proj.dateCreated,
            username: proj.user.username,
            userIsVerified: proj.user.verified,
            hash: proj.hash,
            webSite: proj.webSite,
            images: this.mapMedia(proj.media),
            reachedBudget: '0.00',
            budget: '0.00',
            reachedBudgetPercent: 0
        };
    }

    map(projects){
        return projects.map(proj => {
            return this.mapSingle(proj);
        }) || [];
    }

    mapMedia(medias){
        medias = medias || [];

        if (medias.length == 0){
            return [{
                original: noimage,
                thumbnail: noimage,
            }];
        }

        return medias.map(media => {
            return {
                original: media.url,
                thumbnail: media.url
            }
        });
    }
}

export default ProjectService;