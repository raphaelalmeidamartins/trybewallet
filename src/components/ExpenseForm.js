/* eslint-disable react/jsx-max-depth */
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addExpense,
  fetchExchangeRates,
  updateCurrentExpense,
  updateTotal,
} from '../redux/actions';
import '../sass/components/ExpenseForm.css';

const Comida = 'Comida';

class ExpenseForm extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {
      recordExpense,
      requestExchangeRatesFromAPI,
      expenses,
      currentExpense,
      updateTotalExpenses,
    } = this.props;
    if (currentExpense.id === null) {
      recordExpense(currentExpense, expenses.length);
      requestExchangeRatesFromAPI(expenses.length);
    } else {
      recordExpense(currentExpense, currentExpense.id);
      updateTotalExpenses();
    }
  }

  render() {
    const { currencies, currentExpense, handleInputChange } = this.props;
    const { id, value, description, currency, method, tag } = currentExpense;

    return (
      <form className="ExpenseForm box">
        <div className="field is-grouped">
          <label htmlFor="value-input" className="label">
            Valor
            <div className="control">
              <input
                className="input"
                id="value-input"
                data-testid="value-input"
                type="number"
                name="value"
                value={ value }
                onChange={ handleInputChange }
              />
            </div>
          </label>
          <label htmlFor="currencies" className="label label-currencies">
            Moeda
            <div className="control">
              <div className="select">
                <select
                  id="currencies"
                  name="currency"
                  data-testid="currency-input"
                  value={ currency }
                  onChange={ handleInputChange }
                >
                  {currencies.map((curr) => (
                    <option key={ curr }>{curr}</option>
                  ))}
                </select>
              </div>
            </div>
          </label>
        </div>
        <div className="field">
          <label htmlFor="description-input" className="label">
            Descrição
            <div className="control">
              <input
                className="input"
                id="description-input"
                data-testid="description-input"
                type="text"
                name="description"
                value={ description }
                onChange={ handleInputChange }
              />
            </div>
          </label>
        </div>
        <div className="field">
          <label htmlFor="method-input" className="label">
            Pagamento
            <div className="control">
              <div className="select">
                <select
                  id="method-input"
                  data-testid="method-input"
                  name="method"
                  value={ method }
                  onChange={ handleInputChange }
                >
                  <option>Dinheiro</option>
                  <option>Cartão de crédito</option>
                  <option>Cartão de débito</option>
                </select>
              </div>
            </div>
          </label>
        </div>
        <div className="field">
          <label htmlFor="tag" className="label">
            Categoria
            <div className="control">
              <div className="select">
                <select
                  id="tag"
                  data-testid="tag-input"
                  value={ tag }
                  name="tag"
                  onChange={ handleInputChange }
                >
                  <option>{Comida}</option>
                  <option>Lazer</option>
                  <option>Trabalho</option>
                  <option>Transporte</option>
                  <option>Saúde</option>
                </select>
              </div>
            </div>
          </label>
        </div>
        <div className="field">
          <button
            className="button is-primary"
            type="button"
            onClick={ this.handleSubmit }
            disabled={ !value || !description }
          >
            {`${id !== null ? 'Editar' : 'Adicionar'} despesa`}
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  currentExpense: state.wallet.currentExpense,
});

const mapDispatchToProps = (dispatch) => ({
  recordExpense: (state, index) => dispatch(addExpense(state, index)),
  requestExchangeRatesFromAPI: (index) => dispatch(fetchExchangeRates(index)),
  handleInputChange: ({ target }) => {
    let value = target.name === 'value' ? Number(target.value) : target.value;
    value = Number.isNaN(value) ? '' : value;
    dispatch(updateCurrentExpense(target.name, value));
  },
  updateTotalExpenses: () => dispatch(updateTotal()),
});

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  recordExpense: PropTypes.func.isRequired,
  requestExchangeRatesFromAPI: PropTypes.func.isRequired,
  currentExpense: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  handleInputChange: PropTypes.func.isRequired,
  updateTotalExpenses: PropTypes.func.isRequired,
};

ExpenseForm.defaultProps = {
  currentExpense: {
    id: null,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
