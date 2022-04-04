import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurriencies, updateTotal } from '../actions';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import './Wallet.css';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { requestAPI, updateTotalExpenses } = this.props;
    requestAPI();
    updateTotalExpenses();
  }

  render() {
    return (
      <main className="Wallet">
        <Header />
        <ExpenseForm />
        <ExpensesTable />
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestAPI: () => dispatch(fetchCurriencies()),
  updateTotalExpenses: () => dispatch(updateTotal()),
});

Wallet.propTypes = {
  requestAPI: PropTypes.func.isRequired,
  updateTotalExpenses: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
