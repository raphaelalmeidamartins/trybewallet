import PropTypes from 'prop-types';
import React from 'react';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import logo from '../assets/trybe-wallet-logo-converted.svg';
import Footer from '../components/Footer';
import { userLogin } from '../redux/actions';
import '../sass/pages/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
      focused: '',
      redirect: false,
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
    const { submitLogin } = this.props;
    const { email, password } = this.state;
    submitLogin({ email, password });
    this.setState({ redirect: true });
  }

  handleFocus(name) {
    this.setState({ focused: name });
  }

  render() {
    const { email, password, disabled, focused, redirect } = this.state;

    return (
      <div className="Login">
        { redirect && <Redirect to="/wallet" /> }
        { !redirect && (
          <form>
            <header>
              <img className="Login-logo" src={ logo } alt="TrybeWallet logo" />
              <p>Entre</p>
            </header>
            <div className="Login-input-container">
              <input
                data-testid="email-input"
                type="text"
                name="email"
                value={ email }
                onChange={ this.handleInputChange }
                placeholder="Usuário"
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
                placeholder="Senha"
                onFocus={ () => this.handleFocus('password') }
                onBlur={ () => this.handleFocus('') }
              />
              <span className={ focused === 'password' ? 'icon-focus' : 'icon-blur' }>
                <FaLock />
              </span>
            </div>
            <button type="button" disabled={ disabled } onClick={ this.handleSubmit }>
              ENTRAR
            </button>
          </form>
        ) }
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (state) => dispatch(userLogin(state)),
});

Login.propTypes = {
  submitLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
