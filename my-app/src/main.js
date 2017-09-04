import React from 'react';
import Todos from './Todos';
import AddTodo from './AddTodo';
import { Switch, Route } from 'react-router-dom';

class Main extends React.Component{
    
    constructor(){
        super();
        this.state={
            todos:[]
        };
    }
    
    addTodo(todo){
        let todos=this.state.todos.concat(todo);
        this.setState({
            todos:todos
        });
    }
    updateTodo(todos){
        this.setState({
            todos:todos
        });
    }
    
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/addTodo' render={()=>(
                        <AddTodo callback={this.addTodo.bind(this)}/>
                    )}/>
                    <Route exact path='/listTodo' render={()=>(
                        <Todos todos={this.state.todos} callback={this.updateTodo.bind(this)}/>
                    )}/> 
                </Switch>
            </div>    
        );
    }
}

export default Main;