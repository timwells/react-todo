import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
// import uuid from 'uuid'

import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';

import About from './components/pages/About'
import './App.css';

import axios from 'axios'


class App extends Component {
  state = {
    todos:[]
    /*
    todos: [
      { id:uuid.v4(), title: 'Take out trash', completed: true },
      { id:uuid.v4(), title: 'Dinner with wife', completed: false },
      { id:uuid.v4(), title: 'Meting with boss', completed: false },
    ]
    */
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({todos: res.data}))
  }

  // Toggles completed state.
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      todo.completed = (todo.id===id) ? !todo.completed :  todo.completed;
      return todo;
    }) });
  }

  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => 
        this.setState({
          todos: [...this.state.todos.filter(todo => todo.id !== id)]
        })            
      );
  }

  addTodo = (title) => {
    /*
    const newTodo = {
      id:uuid.v4(),
      title: title,   // or ES6 title
      completed: false
    }
    this.setState({todos: [...this.state.todos, newTodo]})
    */
    axios.post('https://jsonplaceholder.typicode.com/todos', {
        title, // ES6 notation
        complete:false
      })
      .then(res => this.setState(
          { todos: [...this.state.todos, res.data]}
        )
      );

  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} 
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}>  
                </Todos>
              </React.Fragment>
            )}/>

            <Route path="/about" component={About}/>

          </div>      
        </div>
      </Router>
    );
  }
}

export default App;
