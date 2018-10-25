import React from 'react';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';
import ProjectService from '../services/ProjectService';
import ProjectList from '../components/ProjectList';
import '../styles/profile.css'

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.userService = new UserService();
        this.loginService = new LoginService();
        this.projectService = new ProjectService();

        if (this.loginService.isAuthenticated()){
            if (this.loginService.getLoggedUser().username == this.props.match.params.username){
                window.location = '/profile';
            }
        }

        this.state = {
            user: {},
            loadedUser: false,
            projects: [],
            loadedProjects: false
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
    }


    render() {
        const { user, projects,loadedProjects, show} = this.state;
        return (
            <div className='profile-content center'>
                <div className="wrapper">
                    <div className="profile-card">
                        <div className="profile-card-img">
                            <img src={user.profilePicture} alt="profile card"/>
                        </div>
                            <div className="profile-card-content">
                                <div className="profile-card-name">{user.firstName + ' ' + user.lastName}</div>
                                <div className="profile-card-desc">{user.username}</div>
                                <div className="profile-card-desc">{user.phrase}</div>
                                <div className="profile-card-desc"><a href={user.webSite} target='_blank'>{user.webSite}</a></div>
                                <div className="profile-card-location">
                                    <span>
                                        {user.city} - {user.country}
                                    </span>
                            </div>
                            <div className="profile-card-info">
                                <div className="profile-card-info-item">
                                    <div className="profile-card-info-title">{loadedProjects ? projects.length : 0}</div>
                                    <div className="profile-card-info-text">Projects</div>
                               </div>
                            </div>
                            { this.loginService.isAuthenticated() ?
                            <div className="profile-card-options">
                                <button className="profile-button">Message</button>
                            </div>
                            : ''
                            }
                        </div>
                    </div>
                </div>
                <div className='user-projects-list'>
                    <div>
                        { loadedProjects ? <ProjectList projects={projects} /> : '' }
                        { loadedProjects && projects.length == 0 ? <p className='no-project'>No projects yet</p> : '' }
                    </div>
                </div>
            </div>
        );
    }

}

export default Profile;