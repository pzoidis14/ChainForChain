import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateOrder from './CreateOrder';
import OpenBids from './OpenBids';
import { fetchOrdersThunk } from '../store/web3/orders';
import DisplayTodos from './DisplayTodos.js';
import Contract from 'truffle-contract';
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';

class VendorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderListInstance: {},
      orders: [],
      error: null,
    };
  }

  async componentDidMount() {
    await this.props.fetchOrders();
    await this.instantiateContract();
    await this.getOrders();
  }

  async instantiateContract() {
    const orderList = Contract(SimpleStorageContract);
    orderList.setProvider(window.web3.currentProvider);
    const orderListInstance = await orderList.deployed();
    this.setState({ orderListInstance });
  }

  async getOrders() {
    const totalNumberOfOrders = await this.state.orderListInstance.getTotalNumOrders.call();

    const pendingOrdersPromiseArray = [];
    for (let i = 0; i < totalNumberOfOrders; i++) {
      pendingOrdersPromiseArray.push(
        this.state.orderListInstance.returnOrder.call(i)
      );
    }

    const orders = await Promise.all(pendingOrdersPromiseArray);
    this.setState({ orders });
  }

  render() {
    const {
      orders,
      orderListInstance: { createOrder, vendorCompleteOrder },
    } = this.state;

    return (
      <div className="center">
        <h1> Create Order: </h1>
        <CreateOrder fetchOrders={this.props.fetchOrders} />
        <div>
          <h1> Open Bids: </h1>
          <OpenBids
            fetchOrders={this.props.fetchOrders}
            submitBid={this.props.submitBid}
            orders={this.props.orders.filter(
              order => order.bid && !order.orderStatus
            )}
            createOrder={createOrder}
          />
        </div>
        <div style={{ margin: 80 }} />

        <div>
          <h1>Open Orders:</h1>
          <DisplayTodos
            vendorCompleteOrder={vendorCompleteOrder}
            orders={orders}
          />
        </div>
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
