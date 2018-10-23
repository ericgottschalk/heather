import React from 'react';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';
import ProjectList from '../components/ProjectList';
import '../styles/profile.css'

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.userService = new UserService();
        this.loginService = new LoginService();

        if (this.loginService.isAuthenticated()){
            if (this.loginService.getLoggedUser().username == this.props.match.params.username){
                window.location = '/profile';
            }
        }

        this.state = {
            user: {
                firstName: 'Test',
                lastName: 'Test',
                city: 'Porto Alegre',
                country: 'Brazil',
                phrase: 'Easidhas oiashdoasid dasoiashd',
                profilePhoto: 'http://cdn1.itpro.co.uk/sites/itpro/files/styles/article_main_wide_image/public/2015/11/windows-10-screen.jpg?itok=TutXVc_1',
                followersCount: 10,
                followingCount: 32,
                projectsCount: 0, 
            },
            projects: [],
            loadedProjects: true
        };
    }

    componentDidMount() {
        
    }

    render() {
        const { user, projects,loadedProjects } = this.state;
        return (
            <div className='profile-content'>
                <div className="wrapper">
                    <div className="profile-card">
                        <div className="profile-card-img">
                            <img src={user.profilePhoto} alt="profile card"/>
                        </div>
                            <div className="profile-card-content">
                                <div className="profile-card-name">{user.firstName + ' ' + user.lastName}</div>
                                <div className="profile-card-desc">{user.phrase}</div>
                                <div className="profile-card-location">
                                    <span>
                                        {user.city}, {user.country}
                                    </span>
                            </div>
                            <div className="profile-card-info">
                                <div className="profile-card-info-item">
                                    <div className="profile-card-info-title">{user.followersCount}</div>
                                    <div className="profile-card-info-text">Followers</div>
                                </div>
                                <div className="profile-card-info-item">
                                    <div className="profile-card-info-title">{user.followingCount}</div>
                                    <div className="profile-card-info-text">Following</div>
                                </div>
                                <div className="profile-card-info-item">
                                    <div className="profile-card-info-title">{user.projectsCount}</div>
                                    <div className="profile-card-info-text">Projects</div>
                               </div>
                            </div>
                            <div className="profile-card-options">
                                <button className="profile-button">Message</button>
                                <button className="profile-button">Follow</button>
                            </div>
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