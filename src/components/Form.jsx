import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, fetchApiExpenses } from '../actions';

const alimentacao = 'Alimentação';

class Form extends Component {
        state = {
          id: 0,
          value: '',
          description: '',
          currency: 'USD',
          method: 'Dinheiro',
          tag: alimentacao,
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
        tag: alimentacao,
      }));
    }

    render() {
      const { currencies } = this.props;
      const { value, description, currency, method, tag } = this.state;
      const tagChoice = [alimentacao, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
      const payment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

      return (
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
      );
    }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Form.propTypes = {
  dispatch: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Form);
