import React from 'react';
import { nav,Link } from 'react-router-dom';


class Header extends React.Component{
    
    render(){
        return(
            <div>
                <nav>
                    <div><Link to='/addTodo'>Add Todo</Link></div>
                    <div><Link to='/listTodo'>Show Todos</Link></div>
                </nav>
            </div>
        );
    }
}

export default Header;