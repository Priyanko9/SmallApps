import React from 'react';
import Main from './main';
import Header from './header';
//import Todos from './Todos';
//import AddTodo from './AddTodo';
//import { Switch, Route } from 'react-router-dom';

    
class App extends React.Component{
    
    
    
    render(){
        return(
            <div className="app">
                <Header/>
                <Main />
            </div>   
        );
    }
}

export default App;
