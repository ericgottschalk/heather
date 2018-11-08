import React from 'react';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';
import ProjectService from '../services/ProjectService';
import '../styles/project.css';

class Project extends React.Component {
    constructor(props) {
        super(props);

        this.userService = new UserService();
        this.loginService = new LoginService();
        this.projectService = new ProjectService();

        this.state = {
            project: {},
            loadedProject: false,
        };
    }

    componentDidMount(){
        this.projectService.getByHash(this.props.match.params.hash).then(data => { 
            let project = this.projectService.mapSingle(data);

            if (project == null){
                window.location = '/project-not-found';
            }

            this.setState({
                project: project,
                loadedProject: true
            });
        });
    }
    render(){
        const { project, loadedProject } = this.state;
        return (
            <div>
                { loadedProject ? 
                <div>
                    <h2>{project.name}</h2>

                    <h2>{project.description}</h2>

                    <div>
                        <a className='project-a' href={'/user/' + project.username}>Developer profile: {project.username}</a>
                    </div>
                    
                    <div>
                        <a className='project-a' href={project.webSite}>Web Site: {project.webSite}</a>
                    </div>
                </div>
                : 'loading...' }
            </div>
        );
    }
}

export default Project;