import React from 'react';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';
import ProjectService from '../services/ProjectService';
import ImageGallery from 'react-image-gallery';
import { Progress } from 'react-sweet-progress';
import { Badge } from 'react-bootstrap';
import '../styles/project.css';
import "react-image-gallery/styles/css/image-gallery.css";
import "react-sweet-progress/lib/style.css";

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
                    <h2 className='project-title'>{project.name}</h2>
                    <div className='project-top-content wrap-project-infos'>
                        <div className='project-image-gallery'>
                            <ImageGallery items={project.images} />
                        </div>
                        <div className='project-infos'>
                            <div className='project-info project-budget-progress-bar'>
                                <div className='reached-budget'>${project.reachedBudget}</div>
                                <div className='budget'>${project.budget}</div>
                                <Progress className='budget-progress-bar' percent={project.reachedBudgetPercent} status="success" />
                            </div>
                            <div className='project-info project-genre'><p>Genre: {project.genre}</p></div>
                            <div className='project-info project-platform-badges'>
                                <p>Platforms: 
                                    {project.platforms.map(platform => {
                                        return (<Badge className='platform-badge'>{platform.name}</Badge>);
                                    })}
                                </p>
                            </div>     
                            <div className='project-info'>
                                <p>Developer: <a href={'/user/' + project.username}>{project.username}</a></p>
                            </div>
                            
                            <div className='project-info'>
                                <p>Web Site: <a href={project.webSite}>{project.webSite}</a></p>
                            </div> 
                            <div className='project-btn-donate'>
                            <button className="btn-donate">Contribue $</button>
                            </div>               
                        </div>
                    </div>
                    <br className="clearBoth" />
                    <div className='project-content'>
                        <div className='project-content-item'>
                            <h2>About this project</h2>
                            <div className='project-description'>
                                <p>{project.description}</p>
                            </div>
                        </div>
                        <br/><br/><br/><br/>
                        <div className='project-content-item'>
                            <h2>Feedbacks</h2>
                            <div className='project-description'>
                                <p>{project.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                : 'loading...' }
            </div>
        );
    }
}

export default Project;