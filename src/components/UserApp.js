import React, { Component } from 'react';
import DisplayTodos from './DisplayTodos.js';
import CreateTodoBtn from './CreateOrderBtn.js';
import Contract from 'truffle-contract';
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';

// import '../css/oswald.css'
// import '../css/open-sans.css'
// import '../css/pure-min.css'
// import '../css/UserApp.css'

class UserApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoListInstance: {},
      todos: [],
    };
  }

  async componentDidMount() {
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
    console.log(todos);
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>My todos!</h1>
            <p>Coming directly from my smart contract</p>
            <DisplayTodos completeTodo={completeTodo} todos={todos} />
            <CreateTodoBtn createTodo={createTodo} />
          </div>
        </div>
      </main>
    );
  }
}

export default UserApp;
