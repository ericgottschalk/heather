import React from 'react';
import LoginService from '../services/LoginService';
import ProjectService from '../services/ProjectService';
import Cards from 'react-credit-cards';
import Payment from 'payment';
import 'react-credit-cards/es/styles-compiled.css';

class ContribuitionForm extends React.Component{
    constructor(props) {
        super(props);

        this.loginService = new LoginService();
        this.projectService = new ProjectService();

        this.state = {
            idProject: props.idProject,
            idUser: this.loginService.getLoggedUser().id,
            cardNumber: '',
            cardName: '',
            cvv: '',
            cardExpiration: '',
            taxId: '',
            aumont: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        Payment.formatCardNumber(document.querySelector('[name="cardNumber"]'));
        Payment.formatCardExpiry(document.querySelector('[name="cardExpiration"]'));
        Payment.formatCardCVC(document.querySelector('[name="cvv"]'));
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { cardNumber, cardName, cardExpiration, cvv, aumont, taxId, idUser, idProject } = this.state;
        if (cardNumber && cardName && cardExpiration && cvv && aumont && taxId) {
            this.setState({ sended: true });
            let model = {
                cardNumber,
                cardName,
                cardExpiration,
                cvv,
                aumont,
                taxId,
                idUser,
                idProject
            };

            this.projectService.contribue(model).then(data => {
                this.setState({ sended: false });
                alert(data.message);
                if (data.success){
                    window.location = '/project/' + this.props.projectHash;
                }
            }).catch(err => {
                this.setState({ sended: false });
            });
        }
    }

    handleInputFocus = ({ target }) => {
        this.setState({
          focused: target.name,
        });
      };
    
      handleInputChange = ({ target }) => {
        if (target.name === 'cardNumber') {
          this.setState({
            [target.name]: target.value.replace(/ /g, ''),
          });
        }
        else if (target.name === 'cardExpiration') {
          this.setState({
            [target.name]: target.value.replace(/ |\//g, ''),
          });
        }
        else {
          this.setState({
            [target.name]: target.value,
          });
        }
      };

    render(){
        const { cardNumber, cardName, cardExpiration, cvv, focused, aumont, taxId, submitted } = this.state;
        return (
            <div>
                <Cards
                    number={cardNumber}
                    name={cardName}
                    expiry={cardExpiration}
                    cvc={cvv}
                    focused={focused}
                />
                <form name="form" className="contribue-form" onSubmit={this.handleSubmit}>
                    <div>
                        <div className={'form-group' + (submitted && !aumont ? ' has-error' : '')}>
                            <input
                                className="form-control"
                                type="number"
                                name="aumont"
                                placeholder="Total *"
                                min='1' 
                                max='1500'
                                onKeyUp={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div className={'form-group' + (submitted && !taxId ? ' has-error' : '')}>
                            <input
                                className="form-control"
                                type="text"
                                name="taxId"
                                placeholder="Tax Id *"
                                onKeyUp={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                    </div>
                    <div className={'form-group' + (submitted && !cardNumber ? ' has-error' : '')}>
                        <input
                            className="form-control"
                            type="tel"
                            name="cardNumber"
                            placeholder="Card Number *"
                            onKeyUp={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                        />
                    </div>
                    <div className={'form-group' + (submitted && !cardName ? ' has-error' : '')}>
                        <input
                            className="form-control"
                            type="text"
                            name="cardName"
                            placeholder="Name *"
                            onKeyUp={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                        />
                    </div>
                    <div>
                        <div className={'form-group' + (submitted && !cardExpiration ? ' has-error' : '')}>
                            <input
                                className="form-control"
                                type="tel"
                                name="cardExpiration"
                                placeholder="Expiration *"
                                onKeyUp={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div className={'form-group' + (submitted && !cvv ? ' has-error' : '')}>
                            <input
                                className="form-control"
                                type="tel"
                                name="cvv"
                                placeholder="CVC *"
                                onKeyUp={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                    </div>
                    <div>
                        <button className="btn-donate">Confirm</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ContribuitionForm;