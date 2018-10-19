import React from 'react';
import LoginServie from '../services/LoginService';
import ProjectList from '../components/ProjectList';
import ProjectService from '../services/ProjectService';

class MyProjects extends React.Component {
    constructor(props){
        super(props);

        this.loginService = new LoginServie();   
        this.projectService = new ProjectService();

        this.state = {
            projects: []
        };  
    }

    componentDidMount(){
        this.loginService.redirectToLoginIfNotAuthenticated();

        this.projectService.getByUserId(this.loginService.getLoggedUser().id).then(data => { 
            data = data.map(proj => {
                return {
                    id: proj.id,
                    name: proj.name,
                    description: proj.description,
                    coverUrl: proj.media != null && proj.media.lenght > 0 ? proj.media[0] || null : 'https://3.bp.blogspot.com/-KuMNDGpeMRA/WKm-wSm9_xI/AAAAAAAAQ_Y/aC6H9ylZDwc2GT3wFTV4E9ITB68oR5rewCLcB/s1600/master.png',
                    platforms: proj.platformsRaw || []
                }
            }) || [];

            this.setState({
                projects: data,
                loadedProjects: true
            });
        });
    }

    render(){
        const { projects, loadedProjects } = this.state;
        return (
            <div>
                { loadedProjects ? <ProjectList projects={projects} /> : '' }
            </div>
        );
    }
}

export default MyProjects;