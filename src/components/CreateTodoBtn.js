import React, { Component } from 'react';
// import { Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap';

export default class CreateToDoBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // taskName: '',
    };
    this.handlecreateTodo = this.handleCreateTodo.bind(this);
  }

  // handleInputChange(event) {
  //   this.setState({ taskName: event.target.value });
  // }

  async handleCreateTodo() {
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
      // this.setState({ tskName: '' });
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
