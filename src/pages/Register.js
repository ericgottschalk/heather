import React from 'react';
import UserService from '../services/UserService';
import LoginService from '../services/LoginService';
import ReactLoading from "react-loading";
import '../styles/register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                email: ''
            },
            submitted: false
        };

        this.userService = new UserService();
        this.loginService = new LoginService();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        if (user.firstName && user.lastName && user.username && user.password && user.email) {
            this.setState({ sended: true });
            this.userService.register(user).then(() => { 
                this.loginService.login(user.username, user.passwords); 
                this.state.sended = false;
            });
        }
    }

    render() {
        const { user, submitted } = this.state;
        return (
            <div className="container-register">
                <div className="wrap-register">
                    <div className="register-info">
                        <h2>Heather</h2>
                        <p>Share, play and contribute.<br/>Make your project come true.<br/><br/>This is our Indie Game <br/>Crowdfunding platform</p>
                    </div>
                    <div className="register-form">
                        <h2>Register</h2>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                                <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} placeholder="Username *" />
                            </div>
                            <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} placeholder="Password *" />
                            </div>
                            <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                                <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} placeholder="First Name *" />
                            </div>
                            <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                                <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} placeholder="Last Name *" />
                            </div>
                            <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                <input type="email" className="form-control" name="email" value={user.email} onChange={this.handleChange} placeholder="Email *" />
                            </div>
                            <div className="form-group">
                                <button className="register-form-button" disabled={this.state.sended}>{ this.state.sended ? <ReactLoading type="spin" color="#fff" height={'20px'} width={'20px'} /> : "Register"}</button>
                            </div>
                            <div className="register-form-footer">
                                <a href="/login">Already have an Account? Sign In!</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;