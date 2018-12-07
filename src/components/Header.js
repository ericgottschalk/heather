import React from 'react';
import { Navbar, NavItem, Nav, MenuItem, NavDropdown } from 'react-bootstrap';
import LoginServie from '../services/LoginService';
import '../styles/navbar.css';

class Header extends React.Component {
    constructor(props){
        super(props);

        this.loginService = new LoginServie();
    }


    userMenuOrLoginLink(){
        if (this.loginService.isAuthenticated()){
            return (<Nav pullRight>
                        <NavItem eventKey={1} href="/new-project">New Project</NavItem>
                        <NavDropdown eventKey={2} title={this.loginService.getLoggedUser().username} id="basic-nav-dropdown">
                            <MenuItem eventKey={2.1} href="/edit-profile">Profile</MenuItem>
                            <MenuItem eventKey={2.2} href="/my-projects">My Projects</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={2.3} onClick={() => this.loginService.logout()}><i className="fa fa-sign-out"></i> Logout</MenuItem>
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
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} href="/home">Projects</NavItem>
                </Nav>
                {this.userMenuOrLoginLink()} 
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;