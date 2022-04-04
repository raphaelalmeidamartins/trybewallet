import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, totalExpenses } = this.props;

    return (
      <header className="Header">
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">
          {totalExpenses}
        </span>
        <span data-testid="header-currency-field">BRL</span>
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
