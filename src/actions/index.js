export const SEND_EMAIL = 'SEND_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_CURRENCIES_EXPENSES = 'GET_CURRENCIES_EXPENSES';
export const DELETE_ELEMENT = 'DELETE_ELEMENT';
export const EDIT_ELEMENT = 'EDIT_ELEMENT';

export const sendEmail = (email) => ({
  type: SEND_EMAIL,
  payload: email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const getCurrenciesExpenses = (expenses) => ({
  type: GET_CURRENCIES_EXPENSES,
  payload: expenses,
});

export const deleteElement = (id) => ({
  type: DELETE_ELEMENT,
  payload: id,
});

export const createActionEditElement = (id) => ({
  type: EDIT_ELEMENT,
  payload: id,
});

export const fetchApi = () => async (dispatch) => {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endPoint);
  const json = await response.json();
  const keys = Object.keys(json).filter((element) => element !== 'USDT');
  return dispatch(getCurrencies(keys));
};

export const fetchApiExpenses = (expenses) => async (dispatch) => {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endPoint);
  const json = await response.json();
  const obj = {
    ...expenses,
    exchangeRates: json,
  };
  return dispatch(getCurrenciesExpenses(obj));
};
