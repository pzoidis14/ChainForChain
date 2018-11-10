import React, { Component } from 'react';
import { connect } from 'react-redux';
import OpenOrders from './OpenOrders';
import { fetchOrdersThunk, updateOrderThunk } from '../store/web3/orders';

class VendorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      error: null,
    };
  }

  async componentDidMount() {
    await this.props.fetchOrders();
  }

  render() {
    return (
      <div>
        <h1> Open Orders: </h1>
        <OpenOrders
          fetchOrders={this.props.fetchOrders}
          submitBid={this.props.submitBid}
          orders={this.props.orders.filter(order => !order.bid)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrdersThunk()),
    submitBid: (
      orderId,
      daysToDeliver,
      price,
      dailyAttrition,
      attritionCutoff
    ) =>
      dispatch(
        updateOrderThunk(
          orderId,
          daysToDeliver,
          price,
          dailyAttrition,
          attritionCutoff
        )
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendorComponent);
