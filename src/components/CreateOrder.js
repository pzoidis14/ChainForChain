import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addOrderThunk } from '../store/web3/orders';
import VendorForm from './VendorForm';

const mapStateToProps = state => {
  return {
    orders: state.orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitOrder: newOrder => dispatch(addOrderThunk(newOrder)),
  };
};

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderName: '',
      description: '',
      bid: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitOrder(this.state);

    this.props.fetchOrders();

    this.setState({
      orderName: '',
      description: '',
      bid: false,
    });
  }

  render() {
    return (
      <VendorForm
        state={this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const ConnectedCreateOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateOrder);

export default ConnectedCreateOrder;
