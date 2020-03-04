import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
class EditData extends Component {
    constructor(props) {
        super(props);
        this.state ={
            data: {},
            name:'',
      age:'',
      email:'', 
      id:''
        }
    }
    
    componentDidMount() {
        // console.log(this.props.match.params.id);
        this.setState({id: this.props.match.params.id});
        axios.get('http://localhost:4000/find/'+this.props.match.params.id)
  .then((res)=>{
    console.log(res.data.data[0]);
    this.setState({name: res.data.data[0].name, age:res.data.data[0].age, email:res.data.data[0].email});
    console.log(this.state.email);
  })
        
    }
    isChange = (e)=>{
        this.setState({
          [e.target.name]:e.target.value
        });
      }
      haddleClick =(e)=>{
          e.preventDefault();
          const {id, name, age, email} = this.state;
          axios.post('http://localhost:4000/update/',{id, name, age, email})
  .then((res)=>{
    return res.data;
  });
  this.props.history.push('/index');
          
      }
    getEditForm = ()=>{
            return (
                <form onSubmit={(e)=>this.haddleClick(e)}>
                <h2>Name: <input type = "text" name ="name" defaultValue={this.state.name} onChange={(e)=>this.isChange(e)} /></h2>
                <h2>Tuoi: <input type = "text" name ="age" defaultValue={this.state.age} onChange={(e)=>this.isChange(e)} /></h2>
                <h2>Email: <input type = "text" name ="email" defaultValue={this.state.email} onChange={(e)=>this.isChange(e)} /></h2>
                <h2><input type="submit" value="sua" /></h2>
              </form>
            )
            }
    
    render() {

        return (
            <div>
                {this.getEditForm()}
            </div>
        );
    }
}

export default EditData;