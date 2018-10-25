import React from 'react';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';
import ReactLoading from "react-loading";
import '../styles/edit-profile.css'

class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.userService = new UserService();
        this.loginService = new LoginService();

        if (!this.loginService.isAuthenticated()) {
            window.location = '/login';
        }

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                city: '',
                country: '',
                webSite: '',
                phrase: ''
            },
            loadedUser: false,
            submitted: false,
        };

        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.userService.getByUsername(this.loginService.getLoggedUser().id).then(data => {
            let user = this.userService.map(data);

            this.setState({
                user: user,
                loadedUser: true
            });
        });
    }

    handleFileUpload(event) {
        const file = event.target.files[0];

        let formData = new FormData();
        formData.append('id', this.loginService.getLoggedUser().id);
        formData.append('file', file);

        this.userService.uploadProfilePicture(formData).then(window.location.reload());
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;

        if (user.firstName && user.lastName) {
            this.setState({ sended: true });

            this.userService.update(user).then(window.location.reload());
        }
    }

    render() {
        const { user, submitted } = this.state;
        return (
            <div>
                <div className="profile-card-img">
                    <input type="file" id='profile-picture-input' onChange={this.handleFileUpload} />
                    <label htmlFor="profile-picture-input">
                        <img src={user.profilePicture} alt="profile card" />
                    </label>
                </div>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} placeholder="First Name *" />
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} placeholder="Last Name *" />
                    </div>

                    <div className='form-group'>
                        <input type="text" className="form-control" name="city" value={user.city} onChange={this.handleChange} placeholder="City" />
                    </div>

                    <div className='form-group'>
                        <input type="text" className="form-control" name="country" value={user.country} onChange={this.handleChange} placeholder="Country" />
                    </div>

                    <div className='form-group'>
                        <input type="text" className="form-control" name="webSite" value={user.webSite} onChange={this.handleChange} placeholder="Web Site" />
                    </div>

                    <div className='form-group'>
                        <input type="text" className="form-control" name="phrase" value={user.phrase} onChange={this.handleChange} placeholder="Profile Phrase" />
                    </div>

                    <div className="form-group">
                        <button className="register-form-button" disabled={this.state.sended}>{this.state.sended ? <ReactLoading type="spin" color="#fff" height={'20px'} width={'20px'} /> : "Save"}</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditProfile;