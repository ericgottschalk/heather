import React from 'react';
import LoginServie from '../services/LoginService';

class MyProjects extends React.Component {
    constructor(props){
        super(props);

        this.loginService = new LoginServie();        
    }

    componentDidMount(){
        this.loginService.redirectToLoginIfNotAuthenticated();
    }

    render(){
        return (
            <div>
                <h2>Projects</h2>
            </div>
        );
    }
}

export default MyProjects;