class SimpleStorage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  async componentDidMount() {
    console.log(this);
  }

  async getOrders() {
    // use .call() at the end because it is a get method and we need to invoke it this way
    console.log(this);

    const { contract } = this.props;
    const totalNumberOfOrders = await contract.getTotalNumOrders.call();

    const pendingOrdersPromiseArray = [];
    for (let i = 0; i < totalNumberOfOrders; i++) {
      await pendingOrdersPromiseArray.push(contract.returnOrder.call(i));
    }

    const orders = await Promise.all(pendingOrdersPromiseArray);
    this.setState({ orders });
  }

  render() {
    const { orders, error } = this.state;
    return (
      <div>
        {error ? (
          <h1>Oh no! Something went wrong: {error}</h1>
        ) : (
          <div>
            <button onClick={this.getOrders}>Get Orders</button>
          </div>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    contract: state.contract,
    accounts: state.account,
  };
};

export default connect(mapState)(SimpleStorage);


import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
You know you've correctly set up your environment if your simple storage contract is working - you should be able to set and get the value in your smart contract. If not, somethings not right
*/

class SimpleStorage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      error: null,
    };
  }

  async componentDidMount() {
    await this.getOrders;
  }

  // gets the number stored in smart contract storage
  getNumber = () => {
    const { contract, accounts } = this.props;
    console.log(this.props);
    contract.get
      .call(accounts[0])
      .then(value => {
        // converts JS big number obj to string and back to number
        value = Number(value.toString());
        this.setState({ value });
      })
      .catch(error => this.setState({ error }));
  };

  // adds one to the storage in smart contract, refetches contract to update state
  addOne = async () => {
    const { contract, accounts } = this.props;
    const { value } = this.state;
    // sets the gas price manually to make sure the transaction goes through
    await contract.set(value + 1, { from: accounts[0], gasPrice: 5000000000 });
    this.getNumber();
  };

  render() {
    const { value, error } = this.state;
    return (
      <div>
        {error ? (
          <h1>Oh no! Something went wrong: {error}</h1>
        ) : (
          <div>
            <h1>
              The number stored in your smart contract is: <br /> {value}{' '}
            </h1>
            <button onClick={this.addOne}>Add One</button>
            <button onClick={this.getNumber}>Get Number</button>
          </div>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    contract: state.contract,
    accounts: state.account,
  };
};

export default connect(mapState)(SimpleStorage);
