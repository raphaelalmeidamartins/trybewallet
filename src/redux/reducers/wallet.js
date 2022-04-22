// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  ON_REQUEST_FAILURE,
  RECEIVE_CURRENCIES,
  RECEIVE_EXCHANGE_RATES,
  REQUEST_CURRENCIES,
  UPDATE_CURRENT_EXPENSE, UPDATE_TOTAL,
} from '../actions';

const initialRequestStatus = {
  isFetching: false,
  error: null,
};

const initialCurrentExpense = {
  id: null,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Comida',
};

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  requestStatus: initialRequestStatus,
  totalExpenses: '0',
  currentExpense: initialCurrentExpense,
};

const returnTotal = (array) => array
  .reduce((
    acc,
    { value, currency, exchangeRates },
  ) => acc + (value * exchangeRates[currency].ask), 0)
  .toFixed(2);

const deleteExpenseItem = (array, index) => {
  const updatedArray = [...array];
  updatedArray.splice(index, 1);
  return updatedArray;
};

const updateExpenses = (expenses, id, exchangeRates) => {
  const updatedArray = expenses.map((expense) => {
    if (expense.id === id) {
      return {
        ...expense,
        exchangeRates,
      };
    }
    return expense;
  });
  return updatedArray;
};

const handleUpdateCurrentExpense = (state, payload) => ({
  ...state,
  currentExpense: {
    ...state.currentExpense,
    ...payload,
  },
});

const handleAddExpense = (expenses, payload) => {
  const recordedExpense = expenses.find((expense) => expense.id === Number(payload.id));
  if (recordedExpense) {
    const index = expenses.indexOf(recordedExpense);
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = { ...expenses[index], ...payload };
    return updatedExpenses;
  }
  return [...expenses, payload];
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      requestStatus: initialRequestStatus,
      currencies: Object.keys(action.payload)
        .filter((currency) => currency !== 'USDT'),
    };
  case REQUEST_CURRENCIES:
    return {
      ...state,
      requestStatus: { isFetching: true, error: '' },
    };
  case ON_REQUEST_FAILURE:
    return {
      ...state,
      requestStatus: { ...initialRequestStatus, error: action.payload },
    };
  case ADD_EXPENSE:
    return {
      ...state,
      currentExpense: initialCurrentExpense,
      expenses: handleAddExpense(state.expenses, action.payload),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: deleteExpenseItem(state.expenses, action.index),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      currentExpense: action.currentExpense,
    };
  case RECEIVE_EXCHANGE_RATES:
    return {
      ...state,
      expenses: updateExpenses(state.expenses, action.id, action.payload),
    };
  case UPDATE_TOTAL:
    return {
      ...state,
      totalExpenses: returnTotal(state.expenses),
    };
  case UPDATE_CURRENT_EXPENSE:
    return handleUpdateCurrentExpense(state, action.payload);
  default:
    return state;
  }
};

export default wallet;
