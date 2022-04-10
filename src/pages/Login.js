import PropTypes from 'prop-types';
import React from 'react';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { userLogin } from '../actions';
import logoInverted from '../assets/trybe-wallet-logo-inverted.svg';
import logo from '../assets/trybe-wallet-logo.svg';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
      focused: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleInputChange({ target }) {
    this.setState({ [target.name]: target.value }, this.disableButton);
  }

  disableButton() {
    const { email, password } = this.state;
    const emailRegExp = /^([a-z0-9]{1,}[._]{0,1}[a-z0-9]{1,})*(@[a-z0-9]{1,}.com)$/i;
    const minPasswordLength = 6;
    if (!email.match(emailRegExp) || password.length < minPasswordLength) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  }

  handleSubmit() {
    const { submitLogin, history } = this.props;
    submitLogin(this.state);
    history.push('/carteira');
  }

  handleFocus(name) {
    this.setState({ focused: name });
  }

  render() {
    const { email, password, disabled, focused } = this.state;

    return (
      <div className="Login">
        <form>
          <header>
            <img className="Login-logo" src={ logo } alt="TrybeWallet logo" />
            <img
              className="Login-logo-inverted"
              src={ logoInverted }
              alt="TrybeWallet logo"
            />
            <p>Sign in</p>
          </header>
          <div className="Login-input-container">
            <input
              data-testid="email-input"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleInputChange }
              placeholder="Username"
              onFocus={ () => this.handleFocus('email') }
              onBlur={ () => this.handleFocus('') }
            />
            <span className={ focused === 'email' ? 'icon-focus' : 'icon-blur' }>
              <FaUserAlt />
            </span>
          </div>
          <div className="Login-input-container">
            <input
              data-testid="password-input"
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleInputChange }
              placeholder="Password"
              onFocus={ () => this.handleFocus('password') }
              onBlur={ () => this.handleFocus('') }
            />
            <span className={ focused === 'password' ? 'icon-focus' : 'icon-blur' }>
              <FaLock />
            </span>
          </div>
          <button type="button" disabled={ disabled } onClick={ this.handleSubmit }>
            LOGIN
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (state) => dispatch(userLogin(state)),
});

Login.propTypes = {
  submitLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
