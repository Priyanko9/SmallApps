import React from 'react';

class Todos extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
           value:""
        };
    }
    
    editTodos(todo){
        todo.isEdit=true;
        this.props.callback(this.props.todos);
    }
    
    deleteTodos(deleteTodo){
       let indexToDelete=this.props.todos.findIndex((todo) => todo.name === deleteTodo.name);
       if(indexToDelete > -1)
            this.props.todos.splice(indexToDelete,1);
       this.props.callback(this.props.todos);    
    }
    
    completeTodos(todo){
        if(!todo.isCompleted){
          todo.isCompleted=true; 
          this.props.callback(this.props.todos);    
        }
    }
    
    handleChange(event){
        
        
       let todos=this.props.todos;
       if(event.keyCode===13||event.type=="blur"){
           todos=this.props.todos.map((todo)=>{
                if(todo.isEdit){
                    todo.name=event.target.value;  
                    todo.isEdit=false;
                }
               return todo;
            });
            
       }
        this.props.callback(todos); 
    }
            
    getTodo(){
       
        return this.props.todos.map((todo)=>{
           return (
               <div className="todoView" key={todo.name}>
                    
                    {todo.isEdit ? (
                            <input type="text" defaultValue={todo.name} className="editTodo" onKeyUp={this.handleChange.bind(this)} onChange={this.handleChange.bind(this)} onBlur={this.handleChange.bind(this)}></input>
                        ):( todo.isCompleted ? (
                                <span className="todotextCompleted" id="todoItem">{todo.name}</span>
                            ):(
                                <span className="todotext" id="todoItem">{todo.name}</span>
                            )
                    )}
                    <span className="rightPanel"  onClick={this.deleteTodos.bind(this,todo)}>Delete</span>
                    <span className="rightPanel"  onClick={this.completeTodos.bind(this,todo)}>Completed</span>
                    <span className="rightPanel"  onClick={this.editTodos.bind(this,todo)}>Edit</span>
               </div>
            )
        });
        
    }
    
    render(){
        const todolist=this.getTodo();
        return(
            <div className="todoViewContainer">
                {todolist}
            </div>
        );
    }
}

export default Todos;
