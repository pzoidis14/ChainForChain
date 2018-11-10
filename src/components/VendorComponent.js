import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateOrder from './CreateOrder';
import OpenBids from './OpenBids';
import { fetchOrdersThunk } from '../store/web3/orders';

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
        <h1> Create Order: </h1>
        <CreateOrder fetchOrders={this.props.fetchOrders} />
        <h1> Open Bids: </h1>
        <OpenBids
          fetchOrders={this.props.fetchOrders}
          submitBid={this.props.submitBid}
          orders={this.props.orders.filter(order => order.bid)}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendorComponent);
