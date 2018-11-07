import React from 'react';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';
import ReactLoading from "react-loading";
import '../styles/edit-profile.css'
import ProjectService from '../services/ProjectService';

class EditProject extends React.Component {
    constructor(props) {
        super(props);

        this.userService = new UserService();
        this.loginService = new LoginService();
        this.projectService = new ProjectService();

        if (!this.loginService.isAuthenticated()) {
            window.location = '/login';
        }

        this.state = {
            project: {},
            loadedProject: false,
        };

        this.handleCoverImageUpload = this.handleCoverImageUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.projectService.getByHashForEdit(this.props.match.params.hash).then(data => { 
            let project = this.projectService.map(data);

            if (project == null){
                window.location = '/project-not-found';
            }

            this.setState({
                project: project,
                loadedProject: true
            });
        });
    }

    handleCoverImageUpload(event){
        const file = event.target.files[0];

        const { project } = this.state;

        let formData = new FormData();
        formData.append('idUser', this.loginService.getLoggedUser().id);
        formData.append('Idroject', project.id);
        formData.append('file', file);

        this.projectService.uploadCoverImage(formData).then(() => { window.location.reload(); });
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { project } = this.state;
        this.setState({
            project: {
                ...project,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render(){
        return (<div></div>);
    }
}

export default EditProject;