import React from 'react';
import LoginService from '../services/LoginService';
import ProjectCard from './ProjectCard';

class ProjectCardList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: props.projects || []
        };

        this.loginService = new LoginService();
    }

    render() {
        const { projects } = this.state;
        return (
            <div className='project-list'>
                {projects.map((project) => {  
                    return (<ProjectCard project={project}  />)
                })}
            </div>
        );
    }
}

export default ProjectCardList;