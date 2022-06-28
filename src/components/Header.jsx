import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';
import { GiTwoCoins } from 'react-icons/gi';
import { connect } from 'react-redux';
import image from '../images/wallet2.png';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
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
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
