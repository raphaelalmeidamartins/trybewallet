import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaUserAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import logo from '../assets/trybe-wallet-logo-converted.svg';
import '../sass/components/Header.css';

class Header extends Component {
  render() {
    const { email, totalExpenses } = this.props;

    return (
      <header className="Header">
        <img src={ logo } alt="Wallet" />
        <div className="Header-user-info">
          <div className="Header-user-icon">
            <FaUserAlt />
            <span data-testid="email-field" className="Header-email">{ email }</span>
          </div>
          <div>
            <span data-testid="total-field" className="Header-total-expenses">
              {Number(totalExpenses).toFixed(2)}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.string,
};

Header.defaultProps = {
  totalExpenses: '0',
};

export default connect(mapStateToProps, null)(Header);
