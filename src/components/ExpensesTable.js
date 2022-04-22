import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, editExpense, updateTotal } from '../redux/actions';
import '../sass/components/ExpensesTable.css';
import 'bulma/css/bulma.min.css';

class ExpensesTable extends Component {
  render() {
    const { expenses, handleDeleteExpense, handleEditExpense } = this.props;

    return (
      <table className="ExpensesTable table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Tag</th>
            <th>Payment method</th>
            <th>Value</th>
            <th>Currency</th>
            <th>Exchange rate</th>
            <th>Converted value</th>
            <th>Conversion currency</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {expenses.every(({ exchangeRates }) => exchangeRates)
            && expenses.map(
              ({
                id,
                value,
                description,
                currency,
                method,
                tag,
                exchangeRates,
              }, index) => (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name.split('/')[0]}</td>
                  <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>
                    {(Number(exchangeRates[currency].ask) * value).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => handleEditExpense({
                        id,
                        value,
                        description,
                        currency,
                        method,
                        tag,
                      }) }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => handleDeleteExpense(index) }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ),
            )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  handleDeleteExpense: (index) => {
    dispatch(deleteExpense(index));
    dispatch(updateTotal());
  },
  handleEditExpense: (expense) => dispatch(editExpense(expense)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDeleteExpense: PropTypes.func.isRequired,
  handleEditExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
