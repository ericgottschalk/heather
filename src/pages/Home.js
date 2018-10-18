import React from 'react';
import LoginServie from '../services/LoginService';

class Home extends React.Component {
    constructor(props){
        super(props);

        this.loginServie = new LoginServie();
    }

    showUsername(){
        if (this.loginServie.isAuthenticated()){
            return <h2>{this.loginServie.getLoggedUser().username}</h2>
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