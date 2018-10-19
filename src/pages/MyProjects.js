import React from 'react';
import LoginServie from '../services/LoginService';
import ProjectList from '../components/ProjectList';
import ProjectService from '../services/ProjectService';
import "../styles/my-projects.css";

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
                    coverUrl: proj.media != null && proj.media.lenght > 0 ? proj.media[0] || null : 'http://cdn1.itpro.co.uk/sites/itpro/files/styles/article_main_wide_image/public/2015/11/windows-10-screen.jpg?itok=TutXVc_1',
                    platforms: proj.platformsRaw || [],
                    genre: proj.genre.name
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
                <div>
                    <h2 className="my-projects-title">My Projects</h2>
                </div>
                { loadedProjects ? <ProjectList projects={projects} /> : '' }
                { loadedProjects && projects.length == 0 ? <p className='no-project'>No projects yet</p> : '' }
            </div>
        );
    }
}

export default MyProjects;