import React from 'react';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';
import ProjectService from '../services/ProjectService';
import ImageGallery from 'react-image-gallery';
import { Badge } from 'react-bootstrap';
import '../styles/project.css';
import "react-image-gallery/styles/css/image-gallery.css";

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
                    <div className='project-top-content'>
                        <div className='project-image-gallery'>
                            <ImageGallery items={project.images} />
                        </div>
                        <div className='wrap-project-infos'>
                            <div className='project-budget-progress-bar'></div>
                            <div className='project-genre'><p>Genre: {project.genre}</p></div>
                            <div className='project-platform-badges'>
                                {project.platforms.map(platform => {
                                    return (<Badge className='platform-badge'>{platform.name}</Badge>);
                                })}
                            </div>     
                            <div>
                                <a className='project-a' href={'/user/' + project.username}>Developer profile: {project.username}</a>
                            </div>
                            
                            <div>
                                <a className='project-a' href={project.webSite}>Web Site: {project.webSite}</a>
                            </div>                
                        </div>
                    </div>
                    <br className="clearBoth" />
                    <div className='project-description'>
                        <h2>{project.description}</h2>
                    </div>
                </div>
                : 'loading...' }
            </div>
        );
    }
}

export default Project;