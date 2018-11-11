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
      todoListInstance: {},
      todos: [],
      error: null,
    };
  }

  async componentDidMount() {
    await this.props.fetchOrders();
    await this.instantiateContract();
    await this.getTodos();
  }

  async instantiateContract() {
    const todoList = Contract(SimpleStorageContract);
    todoList.setProvider(window.web3.currentProvider);
    const todoListInstance = await todoList.deployed();
    this.setState({ todoListInstance });
  }

  async getTodos() {
    const totalNumberOfTodos = await this.state.todoListInstance.getTotalNumTodos.call();

    const pendingTodosPromiseArray = [];
    for (let i = 0; i < totalNumberOfTodos; i++) {
      pendingTodosPromiseArray.push(
        this.state.todoListInstance.returnTodo.call(i)
      );
    }

    const todos = await Promise.all(pendingTodosPromiseArray);
    this.setState({ todos });
  }

  render() {
    const {
      todos,
      todoListInstance: { createTodo, completeTodo },
    } = this.state;

    return (
      <div>
        <h1> Create Order: </h1>
        <CreateOrder fetchOrders={this.props.fetchOrders} />
        <h1> Open Bids: </h1>
        <OpenBids
          fetchOrders={this.props.fetchOrders}
          submitBid={this.props.submitBid}
          orders={this.props.orders.filter(order => order.bid)}
          createTodo={createTodo}
        />
        <DisplayTodos completeTodo={completeTodo} todos={todos} />
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
