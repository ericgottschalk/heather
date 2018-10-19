import React from 'react';
import LoginService from '../services/LoginService';
import ReactLoading from "react-loading";
import '../styles/login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.loginService = new LoginService();

        if (this.loginService.isAuthenticated()){
            window.location = '/home';
        }

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true, loginError: false });
        const { username, password } = this.state;

        if (username && password) {
            this.setState({ sended: true });
            this.loginService.login(username, password).then(() => {
                this.setState({ sended: false });

                if (this.loginService.isAuthenticated()){
                    window.location = '/home';
                }           
            }).catch(data => {
                this.setState({ sended: false, loginError: true, errorMessage: data });
            });
        }
    }

    showError(errorMessage){
        alert(errorMessage);
        this.setState({ loginError: false});
    }

    render() {
        const { username, password, submitted, sended, loginError, errorMessage } = this.state;
        return (
            <div className="container-login">
                {  loginError ? this.showError(errorMessage) : "" }
                <div className="wrap-login">
                    <div className="login-info">
                        <h2>Heather</h2>
                        <p>Share, discover, play and contribute.<br/>Make your project come true.<br/><br/>This is our Indie Game <br/>Crowdfunding platform</p>
                    </div>
                    <div className="login-form">
                        <h2>Sign In</h2>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} placeholder="Username *" />
                            </div>
                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder="Password *" />
                            </div>
                            <div className="form-group">
                                <button className="login-form-button" disabled={sended}>{ sended ? <ReactLoading type="spin" color="#fff" height={'20px'} width={'20px'} /> : "Enter"}</button>
                            </div>
                            <div className="login-form-forgot">
                                <a href="#">Forgot Username / Password?</a>
                            </div>
                            <div className="login-form-footer">
                                <a href="/register">Create your Account</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;