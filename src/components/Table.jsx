import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { deleteElement, editElement } from '../actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    const thead = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
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
            : (expenses.map(({
              description, tag, method, value, exchangeRates, currency, id,
            }, index) => (
              <tr key={ index } className="table-tr-body">
                <td className="table-td">{ description }</td>
                <td className="table-td">{ tag }</td>
                <td className="table-td">{ method }</td>
                <td className="table-td">{ Number(value).toFixed(2) }</td>
                <td
                  className="table-td"
                >
                  { exchangeRates[currency].name }

                </td>
                <td className="table-td">
                  { Number(exchangeRates[currency].ask).toFixed(2) }

                </td>
                <td className="table-td">
                  {
                    (value * exchangeRates[currency].ask).toFixed(2)
                  }

                </td>
                <td className="table-td">Real</td>
                <td className="table-td">
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={ () => { dispatch(editElement(id)); } }
                  >
                    <FiEdit size={ 20 } className="edit-icon" />
                  </button>
                  <button
                    type="button"
                    className="btn-icon"
                    data-testid="delete-btn"
                    onClick={ () => { dispatch(deleteElement(id)); } }
                  >
                    <AiTwotoneDelete size={ 20 } className="delete-icon" />
                  </button>
                </td>
              </tr>
            ))
            )}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
  idToEdit: state.wallet.idToEdit,
  elementBeingEdit: state.wallet.expenses
    .find(({ id }) => id === state.wallet.idToEdit),
});

export default connect(mapStateToProps)(Table);
