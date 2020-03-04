import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
const findData = (name,age,email)=>{
    return axios.post('http://localhost:4000/add',{name,age,email})
    .then((res)=>{
      return res.data;
    })
  }
  const getData = ()=>{
    return axios.get('http://localhost:4000/users')
    .then((res)=>{
      return res.data;
    })
  }
  const deleteDataById = (id)=>{
    return axios.get('http://localhost:4000/delete/'+id)
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
          content:'content'
        }
        this.haddleClick = this.haddleClick.bind(this);
      }
      componentWillMount (){
        
          // console.log(getData());
          getData().then((res)=>{
            this.setState({
              data:res.data
            });
          })
          
        
      }
      isChange = (e)=>{
        this.setState({
          [e.target.name]:e.target.value
        });
      }
      haddleClick = (e)=>{
        e.preventDefault();
        const {name,age,email,content} = this.state;
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
          
        });
        this.props.history.push('/index');
        // console.log(content);
        
    //    return (<Redirect to="/index" />);
      }
      deleteData = (e,id)=>{
        e.preventDefault();
       
        deleteDataById(id).then((res)=>{
          alert('xóa thành công');
        });

        this.props.history.push('/create');
        
        return <Redirect to="/create" />
      }

      getDataUser = ()=>{
        if(this.state.data !== null){
         return _.map(this.state.data,(value,key)=>{
            return (
              <div key= {key}>
            <h2>Tên:{value.name} </h2>
            <h2>Email:{value.email} </h2>
            {/* {"/chi-tiet/"+this.ChuyenDoiURL(this.props.ten)+"-"+this.props.tinId+".html"} */}
            <h2><button onClick={(e,id)=>this.searchData(e, value.id)}>Sửa</button><button onClick={(e,id)=>this.deleteData(e, value.id)}>xóa</button></h2>
          </div>
            )
          })
      }
    }
    render() {
        return (
            <div>
                
          {/* {this.getDataUser()} */}
                <form >

          <h2>Name: <input type = "text" name ="name" onChange={(e)=>this.isChange(e)} /></h2>
          <h2>Tuoi: <input type = "text" name ="age" onChange={(e)=>this.isChange(e)} /></h2>
          <h2>Email: <input type = "text" name ="email" onChange={(e)=>this.isChange(e)} /></h2>
          <h2><input type="submit" value="Them moi" onClick={(e)=>this.haddleClick(e)} /></h2>
        </form>
            </div>
        );
    }
}

export default AddData;