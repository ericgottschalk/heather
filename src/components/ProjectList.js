import React from 'react';
import ProjectItem from './ProjectItem';
import '../styles/item.css';


class ProjectList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: props.projects || []
        };
    }

    render() {
        const { projects } = this.state;
        return (
            <div className='project-item-list'>
                {projects.map((project) => {  
                    return (<ProjectItem project={project}  />)
                })}
            </div>
        );
    }
}

export default ProjectList;