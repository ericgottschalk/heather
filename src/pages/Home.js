import React from 'react';
import LoginService from '../services/LoginService';

class Home extends React.Component {
    constructor(props){
        super(props);

        this.loginService = new LoginService();
    }

    render(){
        return (
            <div>
                <h2>Home</h2>

                <p>Not implemented yet</p>
            </div>
        );
    }
}

export default Home;