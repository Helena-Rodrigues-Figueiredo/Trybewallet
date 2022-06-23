import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi } from '../actions';

class Wallet extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  render() {
    const { email, currencies } = this.props;
    const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const payment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <>
        <header>
          <p data-testid="email-field">
            { email }
          </p>
          <p data-testid="total-field">
            0
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>
        <form>
          <label htmlFor="value">
            Valor
            <input
              data-testid="value-input"
              id="value"
              autoComplete="off"
            />
          </label>
          <label htmlFor="currencie">
            Moeda
            <select id="currencie">
              {currencies.map((element) => (
                <option key={ element }>{ element }</option>
              ))}
            </select>
          </label>
          <label htmlFor="description">
            Valor
            <input
              data-testid="description-input"
              id="description"
              autoComplete="off"
            />
          </label>
          <label htmlFor="payment">
            Forma de Pagamento
            <select id="payment" data-testid="method-input">
              {payment.map((element) => (
                <option key={ element }>{ element }</option>
              ))}
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select id="tag" data-testid="tag-input">
              {tag.map((element) => (
                <option key={ element }>{ element }</option>
              ))}
            </select>
          </label>
        </form>
        <table>
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
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Wallet);
