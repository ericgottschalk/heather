import React from 'react';
import LoginService from '../services/LoginService';
import ProjectService from '../services/ProjectService';
import Select from 'react-select';
import 'react-credit-cards/es/styles-compiled.css';

class FeedbackForm extends React.Component{
    constructor(props) {
        super(props);

        this.loginService = new LoginService();
        this.projectService = new ProjectService();

        this.state = {
            idProject: props.idProject,
            idUser: this.loginService.getLoggedUser().id,
            text: '',
            rank: '',
        };

        this.ranks = [
            { value: 4, label: 'S', key: 4 },
            { value: 3, label: 'A', key: 3 },
            { value: 2, label: 'B', key: 2 },
            { value: 1, label: 'C', key: 1 },
            { value: 0, label: 'D', key: 0 }
        ];

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { text, rank, idUser, idProject } = this.state;
        if (text && rank) {
            this.setState({ sended: true });
            let model = {
                text,
                rank,
                idUser,
                idProject
            };

            this.projectService.feedback(model).then(data => {
                this.setState({ sended: false });
                
                if (data.success){
                    window.location = '/project/' + this.props.projectHash;
                }
                else{
                    alert(data.message);
                }
            }).catch(err => {
                this.setState({ sended: false });
            });
        }
    }

    handleSelectChange(selected) {
        this.setState({
            rankValue: { id: selected.value, value: selected.value, label: selected.label },
            rank: selected.value
        });
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    render(){
        const { text, rank, rankValue, submitted } = this.state;
        const customStyles = {
            option: (base) => ({
                ...base,
                color: 'rgba(151,105,245,.98)'
            })
        };
        return (
            <div>
                <form name="form" className="feedback-form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && rank ? ' has-error' : '')}>
                        <Select value={rankValue} onChange={this.handleSelectChange} options={this.ranks} placeholder="Rank *" styles={customStyles} />
                    </div>
                    <div className={'form-group' + (submitted && !text ? ' has-error' : '')}>
                        <textarea
                            className="form-control"
                            type="text"
                            name="text"
                            placeholder="Text *"
                            onChange={this.handleChange}
                            maxlength="300"
                        ></textarea>
                    </div>                   
                    <div>
                        <button className="btn-post">Post</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default FeedbackForm;