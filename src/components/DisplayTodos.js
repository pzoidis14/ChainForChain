import React from 'react';
// import { Table, thead, tr, th, tbody, td, Jumbotron } from 'react-bootstrap';
// import CompleteTodoBtn from './CompleteTodoBtn'

const DisplayTodos = ({ todos, completeTodo }) => (
  <div>
    {todos && todos.length > 0 ? (
      <table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(([task, completionStatus], id) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{task}</td>
              <td>{completionStatus.toString()}</td>
              <td>
                <button
                  onClick={() => {
                    window.web3.eth.getAccounts((err, [account]) => {
                      if (err) throw new Error(err);
                      else completeTodo(id, { from: account });
                    });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div>
        {/* <Jumbotron> */}
        <h1>No todos! </h1>
        <p>
          You either don't have any todos yet or are not passing an array of
          todos to the DisplayTodos Component
        </p>
        {/* </Jumbotron> */}
      </div>
    )}
  </div>
);

export default DisplayTodos;
