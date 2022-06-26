import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Wallet.css';
import { FaUserCircle } from 'react-icons/fa';
import { GiTwoCoins } from 'react-icons/gi';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import image from '../images/wallet2.png';
import { fetchApi, fetchApiExpenses, deleteElement } from '../actions';

class Wallet extends React.Component {
state = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
}

componentDidMount = () => {
  const { dispatch } = this.props;
  dispatch(fetchApi());
}

handleChange = ({ target }) => {
  const { name, value } = target;
  this.setState({ [name]: value });
}

handleClick = () => {
  const { dispatch } = this.props;
  dispatch(fetchApiExpenses(this.state));
  this.setState((prevState) => ({
    id: prevState.id + 1,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
  }));
}

render() {
  const { email, currencies, expenses } = this.props;
  const { value, description, currency, method, tag } = this.state;
  const tagChoice = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
  const payment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
  const thead = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
    'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

  return (
    <>
      <header className="header">
        <div className="wallet-trybewallet">
          <img src={ image } alt="wallet" className="wallet-img-2" />
          <span>TRYBE WALLET</span>
        </div>
        <div className="email-total">
          <span><FaUserCircle size={ 20 } className="user-icon" /></span>
          <p data-testid="email-field">
            { email }
          </p>
          <span><GiTwoCoins size={ 20 } className="coins-icon" /></span>
          <span data-testid="total-field">
            <span className="cifrao">R$:</span>
            {expenses.reduce((acc, expense) => (
              acc + expense.value * expense
                .exchangeRates[expense.currency].ask), 0).toFixed(2)}
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </div>
      </header>
      <form className="form">
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            id="value"
            autoComplete="off"
            onChange={ this.handleChange }
            value={ value }
            name="value"
            placeholder="R$0,00"
            className="input-form"
          />
        </label>
        <label htmlFor="currencie">
          Moeda:
          <select
            id="currencie"
            onChange={ this.handleChange }
            value={ currency }
            name="currency"
            className="input-form"
          >
            {currencies.map((element) => (
              <option key={ element } value={ element }>{ element }</option>
            ))}
          </select>
        </label>
        <label htmlFor="payment">
          Forma de Pagamento:
          <select
            id="payment"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
            name="method"
            className="input-form"
          >
            {payment.map((element) => (
              <option key={ element } value={ element }>{ element }</option>
            ))}
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            id="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
            name="tag"
            className="input-form"
          >
            {tagChoice.map((element) => (
              <option key={ element } value={ element }>{ element }</option>
            ))}
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            id="description"
            autoComplete="off"
            onChange={ this.handleChange }
            value={ description }
            name="description"
            placeholder="Ex.: Pizza"
            className="input-form"
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
          className="button-form"
        >
          Adicionar despesa

        </button>
      </form>
      <table className="table">
        <thead className="table-head">
          <tr className="table-tr">
            {thead.map((element) => (
              <th className="table-th" key={ element }>{ element }</th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {expenses.length === 0
            ? null
            : (expenses.map((element, index) => (
              <tr key={ index } className="table-tr-body">
                <td className="table-td">{ element.description }</td>
                <td className="table-td">{ element.tag }</td>
                <td className="table-td">{ element.method }</td>
                <td className="table-td">{ Number(element.value).toFixed(2) }</td>
                <td
                  className="table-td"
                >
                  { element.exchangeRates[element.currency].name }

                </td>
                <td className="table-td">
                  { Number(element
                    .exchangeRates[element.currency].ask).toFixed(2) }

                </td>
                <td className="table-td">
                  {
                    (element.value * element
                      .exchangeRates[element.currency].ask).toFixed(2)
                  }

                </td>
                <td className="table-td">Real</td>
                <td className="table-td">
                  <button type="button" className="btn-icon">
                    <FiEdit size={ 20 } className="edit-icon" />
                  </button>
                  <button
                    type="button"
                    className="btn-icon"
                    data-testid="delete-btn"
                    onClick={ () => {
                      const { dispatch } = this.props;
                      dispatch(deleteElement(element.id));
                    } }
                  >
                    <AiTwotoneDelete size={ 20 } className="delete-icon" />
                  </button>
                </td>
              </tr>
            ))
            )}
        </tbody>
      </table>
    </>
  );
}
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Wallet);
