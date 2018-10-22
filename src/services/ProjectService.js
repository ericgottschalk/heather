import HttpService from './HttpService';

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
    
    save(project) {
        return this.httpService.post('api/project/save', project);
    }

    getGenres(){
        return this.httpService.get('api/project/genres/').then(data => { return data.map(genre => ({ value: genre.id, label: genre.name, key: genre.id }))} );
    }

    getPlatforms(){
        return this.httpService.get('api/project/platforms/').then(data => { return data.map(platform => ({ value: platform.id, label: platform.name, key: platform.id }))} );
    }
}

export default ProjectService;