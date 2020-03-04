import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Link } from 'react-router-dom';
const getData = ()=>{
    return axios.get('http://localhost:4000/users')
    .then((res)=>{
      return res.data;
    })
  }
class GetData extends Component {
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
      componentDidMount (){
        
          // console.log(getData());
          getData().then((res)=>{
            this.setState({
              data:res.data
            });
          })
          
        
      }
      getDataUser = ()=>{
        if(this.state.data !== null){
         return _.map(this.state.data,(value,key)=>{
            return (
              <div key= {key}>
            <h2>Tên:{value.name} </h2>
        {value.email} 
            {/* {"/chi-tiet/"+this.ChuyenDoiURL(this.props.ten)+"-"+this.props.tinId+".html"} */}
            <h2><Link to={"/edit/"+value.id}>Sua</Link><button onClick={(e,id)=>this.deleteData(e, value.id)}>xóa</button></h2>
          </div>
            )
          })
      }
    }
    render() {
        return (
            <div>
                
          {this.getDataUser()}
            </div>
        );
    }
}

export default GetData;