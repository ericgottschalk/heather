import React from 'react';
import LoginServie from '../services/LoginService';
import ProjectCardList from '../components/ProjectCardList';
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
            var projects = this.projectService.map(data);

            this.setState({
                projects: projects,
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
                { loadedProjects ? <ProjectCardList projects={projects} /> : '' }
                { loadedProjects && projects.length == 0 ? <p className='no-project'>No projects yet</p> : '' }
            </div>
        );
    }
}

export default MyProjects;