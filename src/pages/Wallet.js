import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchCurriencies, updateTotal } from '../actions';
import ExpenseForm from '../components/ExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';
import './Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { requestAPI, updateTotalExpenses } = this.props;
    requestAPI();
    updateTotalExpenses();
  }

  render() {
    const { email } = this.props;
    return (
      <main className="Wallet">
        { email === '' && (
          <Redirect to="/" />
        ) }
        { email !== '' && (
          <>
            <Header />
            <ExpenseForm />
            <ExpensesTable />
          </>
        )}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  requestAPI: () => dispatch(fetchCurriencies()),
  updateTotalExpenses: () => dispatch(updateTotal()),
});

Wallet.propTypes = {
  requestAPI: PropTypes.func.isRequired,
  updateTotalExpenses: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
