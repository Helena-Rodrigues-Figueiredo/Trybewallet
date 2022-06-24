import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendEmail } from '../actions';
import './Login.css';

class Login extends React.Component {
  state = {
    isButtonDisabled: true,
    password: '',
    email: '',
  }

  valueInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.buttonState);
  }

  buttonState = () => {
    const { password, email } = this.state;
    const passwordCaracters = 6;

    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if (regex.test(email) && password.length >= passwordCaracters) {
      return this.setState({ isButtonDisabled: false });
    }
    return this.setState({ isButtonDisabled: true });
  }

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(sendEmail(email));
    history.push('/carteira');
  }

  render() {
    const { isButtonDisabled, email, password } = this.state;
    return (
      <div className="login">
        <input
          type="email"
          data-testid="email-input"
          placeholder="email"
          name="email"
          onChange={ this.valueInput }
          value={ email }
          autoComplete="off"
          className="input-login"
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="senha"
          name="password"
          onChange={ this.valueInput }
          value={ password }
          className="input-login"
        />
        <button
          type="button"
          disabled={ isButtonDisabled }
          onClick={ this.handleClick }
          className="button-login"
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect()(Login);
