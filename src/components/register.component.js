import React, { Component } from 'react';
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";



export default class Register extends Component {
constructor(props){
    super(props)
    this.onChangeUsername=this.onChangeUsername.bind(this);
    this.onChangePassword=this.onChangePassword.bind(this);
    this.onChangeFirstName=this.onChangeFirstName.bind(this);
    this.onChangeLastName=this.onChangeLastName.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.Loading=this.Loading.bind(this);

    this.state = {
        username:'',
        password:'',
        firstname:'',
        lastname:'',
        signup: false
      }
    }

onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname
    }

    axios.post('http://localhost:5000/user/signup', user)
      .then(res => res.data.message=== "User created" ? this.setState({signup:true}):this.setState({signup:false}))
      .then(()=>this.Loading(this.state.username,this.state.password))
    .catch(err=> console.log(err));
  }
  Loading(username,pass){
    const user={username:username,password:pass}
    if(this.state.signup){
      axios.post('http://localhost:5001/user/login', user)
      .then( res => localStorage.setItem('token', JSON.stringify(res.data)))
      .then(()=> JSON.parse(localStorage.getItem('token')).message==="auth succesfull" ? this.props.history.replace('/aboutme'):window.alert('signup failed'))
    }else{
  this.setState({
    username: '',
    password: '',
    firstname: '',
    lastname: ''
  })
 }
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  onChangeFirstName(e) {
    this.setState({
      firstname: e.target.value
    })
  }
  onChangeLastName(e) {
    this.setState({
      lastname: e.target.value
    })
  }
  render() {
    return (
    <div>
     <div className="p-3 mb-2 bg-secondary text-white">
        <h3>Create New User</h3>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="p-3 mb-2 bg-secondary text-white">
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>

          <div className="form-group"> 
            <label>Password: </label>
            <input  type="password"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>

          <div className="form-group"> 
            <label>First Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.firstname}
                onChange={this.onChangeFirstName}
                />
          </div>

          <div className="form-group"> 
            <label>Last Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.lastname}
                onChange={this.onChangeLastName}
                />
          </div>

          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
          </div>
        </form>
    </div>
    );
   }
}