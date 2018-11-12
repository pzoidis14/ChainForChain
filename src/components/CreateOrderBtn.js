import React, { Component } from 'react';

export default class CreateOrderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleCreateOrder = this.handleCreateOrder.bind(this);
  }

  async handleCreateOrder() {
    const {
      orderName,
      description,
      daysToDeliver,
      price,
      dailyAttrition,
      attritionCutoff,
    } = this.props.order;
    const { createOrder } = this.props;

    /* CREATE THE TODO HERE */
    window.web3.eth.getAccounts(async (err, accounts) => {
      if (err) throw new Error(err);
      await createOrder(
        orderName,
        description,
        daysToDeliver,
        price,
        dailyAttrition,
        attritionCutoff,
        { from: accounts[0] }
      );
    });
  }

  render() {
    return (
      <button onClick={this.handleCreateOrder} bsStyle="info">
        Create To Do
      </button>
    );
  }
}
