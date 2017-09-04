import React from 'react';

class AddTodo extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
           value:"" 
        };
    }
    handleChange(event){
        this.setState({value:event.target.value});
        if(event.keyCode===13){
            this.addTodo();
        }
    }
    addTodo(){
        
        if(this.state.value!==undefined && this.state.value!==""){
           this.props.callback({
                name:this.state.value,
                completed:false,
                isEdit:false
            }); 
        }
        this.setState({value:""});
    }
    
    
    render(){
        
        return(
            <div className="addTodo">
                <input type="text" onKeyUp={this.handleChange.bind(this)} onChange={this.handleChange.bind(this)} value={this.state.value} ></input>
                <span id="addButton" onClick={this.addTodo.bind(this)}>Add</span>
            </div> 
        );
    }
}

export default AddTodo;