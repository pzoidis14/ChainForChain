import React, { Component } from 'react';
// import { Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap';

export default class CreateToDoBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
    };
  }

  handleInputChange(event) {
    this.setState({ taskName: event.target.value });
  }

  async handleCreateTodo() {
    const { taskName } = this.state;
    const { createTodo } = this.props;

    /* CREATE THE TODO HERE */
    window.web3.eth.getAccounts(async (err, accounts) => {
      if (err) throw new Error(err);
      await createTodo(taskName, { from: accounts[0] });
      this.setState({ tskName: '' });
    });
  }

  render() {
    const { taskName } = this.state;
    return (
      <button onClick={this.handleCreateTodo.bind(this)} bsStyle="info">
        Create To Do
      </button>
    );
  }
}
