import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { Router } from 'express';
import fetch from 'node-fetch';
import AddData from './Components/AddData';
import GetData from './Components/GetData';
import EditData from './Components/EditData';
const getData = ()=>{
  return axios.get('http://localhost:4000/users')
  .then((res)=>{
    return res.data;
  })
}
const findData = (name,age,email)=>{
  return axios.post('http://localhost:4000/add',{name,age,email})
  .then((res)=>{
    return res.data;
  })
}
const findDataFly = (id)=>{
  return axios.post('http://localhost:4000/getuser/',{id})
  .then((res)=>{
    return res.data;
  })
}
const findDataFly1 = (id)=>{
  return axios.get('http://localhost:4000/find/'+id)
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
class App extends Component {
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

  deleteData = (e,id)=>{
    e.preventDefault();
 
    deleteDataById(id).then((res)=>{
      alert('xóa thành công');
    });
    this.props.history.push('/');
  }
searchData=(e,id)=>{
  e.preventDefault();
  alert('id là' +id);
  this.setState({id:1});

  findDataFly1(id).then((res)=>{
    // console.log(res.data);
    
  });
  let idF = this.state.id; 
  // fetch('http://localhost:4000/gettest/'+idF)
  // .then(res => res.json())
  // .then(json => console.log(json));
  // findDataFly1(this.state.id).then((res)=>{
  //   this.setState({
  //     dataF:res.data
  //   });
  //   console.log(this.state.dataF);
    
  // })
  console.log('id nhân dc là: '+id);
  
  axios.get('http://localhost:4000/find/'+id)
  .then((res)=>{
    // // return res.data;
    // console.log(res.data.data[0]);
    this.setState({dataF: res.data.data[0]});
    let ten = res.data.data[0].name;
    console.log(ten); 
    // return this.getFindData();
  })
  
}
// getDataMovies = async (nameMovie) => {
//   const data = await fetch(`http://localhost:4000/find/${nameMovie}`);
//   return data.json();
// };
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
// getFindData = ()=>{
//   if(this.state.dataF !== null){
//     return _.map(this.state.dataF, (value,key)=>{
//       return (
//         <div>
//           <h3>{value.email}</h3>
//         </div>
//       )
//     })
//   }
// }
// checkData = ()=>{
//   if(this.state.dataF !== null){
//     return this.getFindData();
//   }
// }
  render() {
    // console.log(this.state.data);
    
    return (
    
      <Router>
      <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">React CRUD Example</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">Index</Link>
                </li>
              </ul>
            </div>
          </nav> <br/>
          <h2>Welcome to React CRUD Tutorial</h2> <br/>
          <Switch>
              <Route exact path='/create' component={ AddData } />
              <Route exact path='/index' component={ GetData } />
              <Route exact path='/edit/:id' component={EditData} />
          </Switch>
        </div>
      
      </Router>
      
    );
  }
}

export default App;