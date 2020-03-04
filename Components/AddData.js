import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
const findData = (name,age,email)=>{
    return axios.post('http://localhost:4000/add',{name,age,email})
    .then((res)=>{
      return res.data;
    })
  }
class AddData extends Component {
    constructor(props) {
        super(props);
        this.state ={
          data: null,
          name:'',
          age:'',
          email:'',
          id:'',
          Id:'',
          dataF: null
        }
      }
      componentWillMount (){
        if(this.state.data === null){
          // console.log(getData());
          getData().then((res)=>{
            this.setState({
              data:res.data
            });
          })
          
        }
      }
      isChange = (e)=>{
        this.setState({
          [e.target.name]:e.target.value
        });
      }
      haddleClick = (e)=>{
        e.preventDefault();
        const {name,age,email} = this.state;
        // var datatemp = [];
        // var item = {};
        // item.name = name;
        // item.age = age;
        // item.email = email;
        // datatemp = this.state.data;
        // if(item.name !== ''){
        //   datatemp.push(item);
        //   this.setState({
        //     data:datatemp
        //   });
        // }
        findData(name,age,email).then((res)=>{
          console.log(res.data);
          
        })
      }
    
    render() {
        return (
            <div>
                <form onSubmit={(e)=>this.haddleClick(e)}>
          <h2>Name: <input type = "text" name ="name" onChange={(e)=>this.isChange(e)} /></h2>
          <h2>Tuoi: <input type = "text" name ="age" onChange={(e)=>this.isChange(e)} /></h2>
          <h2>Email: <input type = "text" name ="email" onChange={(e)=>this.isChange(e)} /></h2>
          <h2><input type="submit" value="Them moi" /></h2>
        </form>
            </div>
        );
    }
}

export default AddData;