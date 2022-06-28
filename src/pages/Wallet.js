import React, { Component } from 'react';
import './Wallet.css';
import Header from '../components/Header';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends Component {
  render() {
    return (
      <>
        <Header />
        <Form />
        <Table />
      </>
    );
  }
}

export default Wallet;
