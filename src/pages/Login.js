import PropTypes from 'prop-types';
import React from 'react';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { userLogin } from '../actions';
import './Login.css';
import logo from '../assets/logo.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    const { email, password, disabled } = this.state;

    return (
      <div className="Login">
        <form>
          <header>
            <img src={ logo } alt="TrybeWallet logo" />
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
            />
            <span>
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
            />
            <span>
              <FaLock />
            </span>
          </div>
          <button
            type="button"
            disabled={ disabled }
            onClick={ this.handleSubmit }
          >
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
