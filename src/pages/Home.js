import React from 'react';
import LoginService from '../services/LoginService';

class Home extends React.Component {
    constructor(props){
        super(props);

        this.loginService = new LoginService();
    }

    showUsername(){
        if (this.loginService.isAuthenticated()){
            return <h2>{this.loginService.getLoggedUser().username}</h2>
        }

        return <h2>fail</h2>;
    }

    render(){
        return (
            <div>
                <h2>Home</h2>

                {this.showUsername()}
            </div>
        );
    }
}

export default Home;