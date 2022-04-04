// Coloque aqui suas actions
const USER_LOGIN = 'USER_LOGIN';
const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
const ON_REQUEST_FAILURE = 'ON_REQUEST_FAILURE';
const ADD_EXPENSE = 'ADD_EXPENSE';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';
const RECEIVE_EXCHANGE_RATES = 'RECEIVE_EXCHANGE_RATES';
const UPDATE_TOTAL = 'UPDATE_TOTAL';
const UPDATE_CURRENT_EXPENSE = 'UPDATE_CURRENT_EXPENSE';

const userLogin = ({ email }) => ({
  type: USER_LOGIN,
  email,
});

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const receiveCurrencies = (json) => ({
  type: RECEIVE_CURRENCIES,
  payload: json,
});

const onRequestFailure = (errorMsg) => ({
  type: ON_REQUEST_FAILURE,
  payload: errorMsg,
});

const fetchCurriencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  if (response.ok) dispatch(receiveCurrencies(json));
  else dispatch(onRequestFailure('Soliticação recusada'));
};

const receiveExchangeRates = (json, id) => ({
  type: RECEIVE_EXCHANGE_RATES,
  id,
  payload: json,
});

const updateTotal = () => ({
  type: UPDATE_TOTAL,
});

const fetchExchangeRates = (id) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  dispatch(receiveExchangeRates(json, id));
  dispatch(updateTotal());
};

const addExpense = (expense, index) => ({
  type: ADD_EXPENSE,
  payload: { ...expense, id: index },
});

const deleteExpense = (index) => ({
  type: DELETE_EXPENSE,
  index,
});

const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  currentExpense: expense,
});

const updateCurrentExpense = (name, value) => ({
  type: UPDATE_CURRENT_EXPENSE,
  payload: {
    [name]: value,
  },
});

export {
  USER_LOGIN,
  userLogin,
  fetchCurriencies,
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES,
  ON_REQUEST_FAILURE,
  addExpense,
  ADD_EXPENSE,
  deleteExpense,
  DELETE_EXPENSE,
  editExpense,
  EDIT_EXPENSE,
  fetchExchangeRates,
  RECEIVE_EXCHANGE_RATES,
  updateTotal,
  UPDATE_TOTAL,
  updateCurrentExpense,
  UPDATE_CURRENT_EXPENSE,
};
