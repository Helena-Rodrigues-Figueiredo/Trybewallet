export const SEND_EMAIL = 'SEND_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const sendEmail = (email) => ({
  type: SEND_EMAIL,
  payload: email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const fetchApi = () => async (dispatch) => {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endPoint);
  const json = await response.json();
  const keys = Object.keys(json).filter((element) => element !== 'USDT');
  return dispatch(getCurrencies(keys));
};
