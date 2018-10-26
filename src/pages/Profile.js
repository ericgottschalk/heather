import React from 'react';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';
import ProjectService from '../services/ProjectService';
import ProjectList from '../components/ProjectList';
import { Tabs, Tab } from 'react-bootstrap';
import '../styles/profile.css'

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.userService = new UserService();
        this.loginService = new LoginService();
        this.projectService = new ProjectService();

        this.state = {
            user: {},
            loadedUser: false,
            projects: [],
            loadedProjects: false,
            show: false
        };
    }

    componentDidMount() {
        this.projectService.getByUsername(this.props.match.params.username).then(data => { 
            let projects = this.projectService.map(data);

            this.setState({
                projects: projects,
                loadedProjects: true
            });
        });

        this.userService.getByUsername(this.props.match.params.username).then(data => {
            let user = this.userService.map(data);

            this.setState({
                user: user,
                loadedUser: true
            });
        });

        this.setState({
            show: true
        });
    }

    isProfileOfLoggedUser(){
        if (this.loginService.isAuthenticated()){
            if (this.loginService.getLoggedUser().username == this.props.match.params.username){
                return true;
            }
        }

        return false;
    }

    render() {
        const { user, projects,loadedProjects, loadedUser, show} = this.state;
        return (
            <div className='profile-content center'>
                { show && loadedUser ?
                <div className="wrapper">
                    <div className="profile-card">
                        <div className="profile-card-img">
                            <img src={user.profilePicture} alt="profile card"/>
                        </div>
                            <div className="profile-card-content">
                                <div className="profile-card-name">{user.firstName + ' ' + user.lastName}</div>
                                <div className="profile-card-desc">{user.username}{ user.verified ? <i className="fas fa-check" alt='Verified'></i> : ''}</div>
                                <div className="profile-card-desc">Since {user.dateRegister}</div>
                                <div className="profile-card-desc">{user.phrase}</div>
                                <div className="profile-card-desc"><a href={user.webSite} target='_blank'>{user.webSite}</a></div>
                                <div className="profile-card-location">
                                    <span>
                                        {user.city} - {user.country}
                                    </span>
                            </div>
                            { this.loginService.isAuthenticated() ?
                            <div className="profile-card-options">                 
                                { this.isProfileOfLoggedUser() ?
                                    <button className="profile-button" onClick={() => { window.location = '/edit-profile'; }}>Edit</button>
                                : 
                                <button className="profile-button" onClick={() => { alert('Not implemented yet'); }}>Message</button>
                                }
                            </div>
                            : ''
                            }
                        </div>
                    </div>
                </div>
                : ''
                }
                { show ? 
                <div className='user-projects-list'>
                    <Tabs defaultActiveKey={1} id="tab-projects" className="projects-tab roxinho">
                        <Tab eventKey={1} title="Projects" animation>
                            <div>
                            { loadedProjects ? <ProjectList projects={projects} /> : '' }
                            { loadedProjects && projects.length == 0 ? <p className='no-project'>No projects yet</p> : '' }
                            </div>
                        </Tab>          
                    </Tabs>      
                </div>
                : ''}
            </div>
        );
    }

}

export default Profile;