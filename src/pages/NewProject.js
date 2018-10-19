import React from 'react';
import LoginService from '../services/LoginService';
import ProjectService from '../services/ProjectService';
import ReactLoading from "react-loading";
import Select from 'react-select';
import '../styles/new-project.css';
import 'react-datepicker/dist/react-datepicker.css';

class NewProject extends React.Component {
    constructor(props) {
        super(props);

        this.projectService = new ProjectService();
        this.loginService = new LoginService();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            project: {
                name: '',
                description: '',
                whyInvest: '',
                user: {
                    id: ''
                },
                genre: '',
                platformsRaw: [],
                targetReleaseYear: '',
                media: []

            },
            submitted: false,
        };
    }

    componentDidMount() {
        this.loginService.redirectToLoginIfNotAuthenticated();

        this.projectService.getGenres().then(data => {
            this.setState({
                genres: data || [],
                loadedGenres: true
            });
        });

        this.projectService.getPlatforms().then(data => {
            this.setState({
                platforms: data || [],
                loadedPlatforms: true
            });
        });
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

    handleMultiSelectChange(selectedValues) {
        const { project } = this.state;

        this.setState({
            project: {
                ...project,
                platformsRaw: selectedValues.map(value => ({ id: value.value, value: value.value, label: value.label }))
            }
        });
    }

    handleSelectChange(selected) {
        const { project } = this.state;
        this.setState({
            project: {
                ...project,
                genre: { id: selected.value, value: selected.value, label: selected.label }
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { project } = this.state;
        project.user.id = this.loginService.getLoggedUser().id;

        if (project.description && project.name && project.whyInvest && project.platformsRaw.length > 0 && project.genre && project.targetReleaseYear) {
            this.setState({ sended: true });
            this.projectService.save(project).then(() => {
                this.setState({ sended: false });
            }).catch(err => {
                this.setState({ sended: false });
            });
        }
    }

    render() {
        const customStyles = {
            option: (base) => ({
              ...base,
              color: 'rgba(151,105,245,.98)'
            })
        };
        const { project, submitted, loadedPlatforms, platforms, loadedGenres, genres } = this.state;
        return (
            <div className="container-project">
                <div className="wrap-project">
                    <div className="project-form">
                        <h2>New Project</h2>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !project.name ? ' has-error' : '')}>
                                <input type="text" className="form-control" name="name" value={project.name} onChange={this.handleChange} placeholder="Name *" />
                            </div>
                            <div className={'form-group' + (submitted && !project.description ? ' has-error' : '')}>
                                <textarea className="form-control" name="description" value={project.description} onChange={this.handleChange} placeholder="Description *" />
                            </div>
                            <div className={'form-group' + (submitted && !project.whyInvest ? ' has-error' : '')}>
                                <textarea className="form-control" name="whyInvest" value={project.whyInvest} onChange={this.handleChange} placeholder="Why Invest *" />
                            </div>
                            <div className={'form-group' + (submitted && !project.targetReleaseYear ? ' has-error' : '')}>
                                <input type="number" min='2018' max='2050' className="form-control" name="targetReleaseYear" value={project.targetReleaseYear} onChange={this.handleChange} placeholder="Target Release Year *" />
                            </div>

                            {loadedPlatforms ?
                                <div className={'form-group' + (submitted && project.platformsRaw.length == 0 ? ' has-error' : '')}>
                                    <Select value={project.platformsRaw} isMulti onChange={this.handleMultiSelectChange.bind(this)} options={platforms} placeholder="Platforms *" styles={customStyles} />
                                </div>
                                : ''}
                            {loadedGenres ?
                                <div className={'form-group' + (submitted && !project.genre ? ' has-error' : '')}>
                                    <Select value={project.genre} onChange={this.handleSelectChange.bind(this)} options={genres} placeholder="Genre *" styles={customStyles} />
                                </div>
                                : ''}

                            <div className="form-group">
                                <button className="register-form-button" disabled={this.state.sended}>{this.state.sended ? <ReactLoading type="spin" color="#fff" height={'20px'} width={'20px'} /> : "Register"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewProject;