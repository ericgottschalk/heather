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

    map(projects){
        return projects.map(proj => {
            return {
                id: proj.id,
                name: proj.name,
                description: proj.description,
                coverUrl: proj.media != null && proj.media.lenght > 0 ? proj.media[0] || null : 'http://cdn1.itpro.co.uk/sites/itpro/files/styles/article_main_wide_image/public/2015/11/windows-10-screen.jpg?itok=TutXVc_1',
                platforms: proj.platformsRaw || [],
                genre: proj.genre.name,
                date: proj.dateCreated,
                username: proj.user.username
            }
        }) || [];
    }
}

export default ProjectService;