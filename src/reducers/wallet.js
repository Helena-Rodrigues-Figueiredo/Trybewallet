import { DELETE_ELEMENT, GET_CURRENCIES,
  GET_CURRENCIES_EXPENSES, EDIT_ELEMENT } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case GET_CURRENCIES_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_ELEMENT:
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.payload),
    };
  case EDIT_ELEMENT:
    return {
      ...state,
      edit: true,
      idToEdit: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
