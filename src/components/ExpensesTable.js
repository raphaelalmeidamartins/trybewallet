import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, editExpense, updateTotal } from '../actions';
import './ExpensesTable.css';

class ExpensesTable extends Component {
  render() {
    const { expenses, handleDeleteExpense, handleEditExpense } = this.props;

    return (
      <table className="ExpensesTable">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
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
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => handleDeleteExpense(index) }
                    >
                      Excluir
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
