import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, fetchApiExpenses } from '../actions';

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
      <header>
        <p data-testid="email-field">
          { email }
        </p>
        <p data-testid="total-field">
          {expenses.reduce((acc, expense) => (
            acc + expense.value * expense
              .exchangeRates[expense.currency].ask), 0).toFixed(2)}
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>
      <form>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            data-testid="value-input"
            id="value"
            autoComplete="off"
            onChange={ this.handleChange }
            value={ value }
            name="value"
            placeholder="R$0,00"
          />
        </label>
        <label htmlFor="currencie">
          Moeda
          <select
            id="currencie"
            onChange={ this.handleChange }
            value={ currency }
            name="currency"
          >
            {currencies.map((element) => (
              <option key={ element } value={ element }>{ element }</option>
            ))}
          </select>
        </label>
        <label htmlFor="payment">
          Forma de Pagamento
          <select
            id="payment"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
            name="method"
          >
            {payment.map((element) => (
              <option key={ element } value={ element }>{ element }</option>
            ))}
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            id="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
            name="tag"
          >
            {tagChoice.map((element) => (
              <option key={ element } value={ element }>{ element }</option>
            ))}
          </select>
        </label>
        <label htmlFor="description">
          Descrição
          <input
            data-testid="description-input"
            id="description"
            autoComplete="off"
            onChange={ this.handleChange }
            value={ description }
            name="description"
            placeholder="Ex.: Pizza"
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa

        </button>
      </form>
      <table>
        <thead>
          <tr>
            {thead.map((element) => (
              <th key={ element }>{ element }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0
            ? null
            : (expenses.map((element, index) => (
              <tr key={ index }>
                <td>{ element.description }</td>
                <td>{ element.tag }</td>
                <td>{ element.method }</td>
                <td>{ Number(element.value).toFixed(2) }</td>
                <td>{ element.exchangeRates[element.currency].name }</td>
                <td>
                  { Number(element
                    .exchangeRates[element.currency].ask).toFixed(2) }

                </td>
                <td>
                  {
                    (element.value * element
                      .exchangeRates[element.currency].ask).toFixed(2)
                  }

                </td>
                <td>Real</td>
                <td>{ element.description }</td>
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
