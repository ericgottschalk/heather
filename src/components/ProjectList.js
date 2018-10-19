import React from 'react';
import LoginServie from '../services/LoginService';
import ProjectCard from '../components/ProjectCard';

class ProjectList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: props.projects || []
        };

        this.loginService = new LoginServie();
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

export default ProjectList;