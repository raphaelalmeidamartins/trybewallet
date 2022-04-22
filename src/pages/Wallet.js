import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';
import { fetchCurriencies, updateTotal } from '../redux/actions';
import '../sass/pages/Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { requestAPI, updateTotalExpenses } = this.props;
    requestAPI();
    updateTotalExpenses();
  }

  render() {
    const { email } = this.props;
    return (
      <div className="Wallet-container">
        <main className="Wallet">
          { email === '' && (
            <Redirect to="/" />
          ) }
          { email !== '' && (
            <>
              <Header />
              <ExpenseForm />
              <div className="table-container">
                <ExpensesTable />
              </div>
            </>
          )}
        </main>
      </div>
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
