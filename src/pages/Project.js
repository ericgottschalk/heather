import React from 'react';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';
import ProjectService from '../services/ProjectService';
import ContribuitionForm from '../components/ContribuitionForm';
import ImageGallery from 'react-image-gallery';
import ReactModal from 'react-modal';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackItem from '../components/FeedbackItem';
import FeedbackList from '../components/FeedbackList';
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
            userFeedback: {},
            loadedFeedback: false,
            showModal: false,
            feedbacks: {},
            loadedFeedbacks: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCoverImageUpload = this.handleCoverImageUpload.bind(this);
    }

    handleCoverImageUpload(event){
        const file = event.target.files[0];

        const { project } = this.state;

        let formData = new FormData();
        formData.append('idUser', this.loginService.getLoggedUser().id);
        formData.append('idProject', project.id);
        formData.append('file', file);

        this.projectService.uploadCoverImage(formData).then(() => { window.location.reload(); });
    }

    handleOpenModal () {
        this.loginService.redirectToLoginIfNotAuthenticated();

        this.setState({ showModal: true });
    }
      
    handleCloseModal () {
        this.setState({ showModal: false });
    }

    componentDidMount(){
        this.projectService.getByHash(this.props.match.params.hash).then(data => { 
            let project = this.projectService.mapSingle(data);
            
            this.projectService.getFeedbacks(project.id).then(data => {
                this.setState({
                    feedbacks: data,
                    loadedFeedbacks: true
                });
            });

            if (this.loginService.isAuthenticated()) {
                this.projectService.getUserContribuition(this.loginService.getLoggedUser().id, project.id).then(data => {
                    this.handleLoadProject(project, data);
                });

                this.projectService.getUserFeedback(this.loginService.getLoggedUser().id, project.id).then(data => {
                    if (!data.success){
                        alert(data.message);
                    }
                    else {
                        this.setState({
                            userFeedback: data.feedback,
                            loadedFeedback: data.success
                        });
                    }
                });
            }
            else{
                this.handleLoadProject(project, null);
            }
        });
    }

    handleLoadProject(project, loggedUserContibuition){
        if (project == null){
            window.location = '/project-not-found';
        }

        this.setState({
            project: project,
            loadedProject: true,
            loggedUserContibuition: loggedUserContibuition
        });
    }

    getFeedbackFormOrUserFeedback(project, userFeedback){
        return (
            <div>
                { userFeedback == null ?
                    <FeedbackForm idProject={project.id} projectHash={project.hash} />
                  : 
                    <div className='your-feedback'>
                        <h5>Your feedback</h5>
                        <FeedbackItem feedback={userFeedback} />
                    </div>
                }
            </div>
        );
    }

    render(){
        const { project, loadedProject, loggedUserContibuition, userFeedback, loadedFeedback, feedbacks, loadedFeedbacks } = this.state;
        return (
            <div>
                { loadedProject ? 
                <div> 
                    <div>
                        <h2 className='project-title'>{project.name}</h2>
                        { (this.loginService.isAuthenticated() && this.loginService.getLoggedUser().id == project.idUser) ? 
                              <div>
                                  <label className='change-cover-label' htmlFor='cover-picture-input'>Change Image</label>
                                  <input type="file" id='cover-picture-input' onChange={this.handleCoverImageUpload} />
                              </div>
                           :  
                               "" 
                        }
                    </div>                   
                    
                    <div className='project-top-content wrap-project-infos'>
                        <div className='project-image-gallery'>
                            <ImageGallery items={project.images} />
                            
                        </div>
                        <div className='project-infos'>
                            <div className='project-info project-budget-progress-bar'>
                                <div className='reached-budget'>${project.reachedBudget}</div>
                                <div className='budget'>${project.budget}</div>
                                <div className='percent'>{project.reachedBudgetPercent}%</div>
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
                            {
                                loggedUserContibuition != null ?
                                    <div className='project-info'>
                                        <p>Your contribuition: ${loggedUserContibuition}</p>
                                    </div>
                                : 
                                    ""
                            }
                            <div className='project-btn-donate'>
                                <button className="btn-donate" onClick={this.handleOpenModal}>Contribue $</button>
                                <ReactModal 
                                    isOpen={this.state.showModal}
                                    contentLabel="Contribue $"
                                    >
                                    
                                    <button className='cancel-contribuition-modal' onClick={this.handleCloseModal}>Cancel</button>
                                    <ContribuitionForm idProject={project.id} projectHash={project.hash} />
                                </ReactModal>
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
                            <div className='user-feedback'>
                                { loadedFeedback ? this.getFeedbackFormOrUserFeedback(project, userFeedback) : <div className="feedback-form"><button onClick={() => { window.location = '/login'; }} className="btn-post">Login to post an feedback</button></div> }
                            </div>
                            <div className='feedback-list'>
                                <h5>Feedback list</h5>
                                { loadedFeedbacks ? <FeedbackList feedbacks={feedbacks}/> : "" }
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