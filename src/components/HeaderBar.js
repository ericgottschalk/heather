import React from 'react';
import {Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap';
import LoginServie from '../services/LoginService';

class HeaderBar extends React.Component {
    constructor(props){
        super(props);

        this.loginService = new LoginServie();
    }


    userMenuOrLoginLink(){
        if (this.loginService.isAuthenticated()){
            return (<Nav pullRight>
                        <NavItem eventKey={1} href="/new-project">New Project</NavItem>
                        <NavItem href="/profile"><i class="far fa-user-circle"></i></NavItem>
                        <NavDropdown eventKey={2} title={this.loginService.getLoggedUser().username} id="basic-nav-dropdown">

                            <MenuItem eventKey={2.1} href="/profile">Profile</MenuItem>
                            <MenuItem eventKey={2.2} href="/my-projects">My Projects</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={2.3} onClick={() => this.loginService.logout()}><i class="fa fa-sign-out"></i> Logout</MenuItem>
                        </NavDropdown>
                    </Nav>);
        }

        return (<Nav pullRight>
                   <NavItem eventKey={1} href="/login">Login</NavItem>
                   <NavItem eventKey={2} href="/register">Register</NavItem>
                </Nav>)
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/home">Heather</a>            
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="/projects">Projects</NavItem>
                </Nav>
                {this.userMenuOrLoginLink()} 
            </Navbar>
        );
    }
}

export default HeaderBar;