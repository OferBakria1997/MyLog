import React, { Component } from 'react';
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";



export default class Settings extends Component {
constructor(props){
    super(props)
    this.onChangePassword=this.onChangePassword.bind(this);
    this.onChangeFirstName=this.onChangeFirstName.bind(this);
    this.onChangeLastName=this.onChangeLastName.bind(this);
    this.onSubmit=this.onSubmit.bind(this);

    this.state = {
        username:'',
        password:'',
        firstname:'',
        lastname:'',
        id:''
      }
    }
componentDidMount() {
    if(localStorage.getItem('token')){

    const token = JSON.parse(localStorage.getItem('token'));
    axios.get('http://localhost:5001/user/editAuth',{headers: {"authorization" : token.accessToken}})
    .then(res=> res.data.message==="fail" ? this.props.history.replace('/login'):
    this.setState({
    username:res.data.username,
    firstname:res.data.firstname,
    lastname:res.data.lastname,
    id:res.data._id
  })
    )

    }
    else{
        console.log("fail")
        window.alert('Login first');
        this.props.history.replace('/login');
      } 
    }
onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      id:this.state.id
    }

    axios.post('http://localhost:5000/user/update', user)
      .then(res => {
        localStorage.removeItem('token');
        this.props.history.replace('/login');
      });

    this.setState({
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      id:''
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
        <h3>Edit User Settings</h3>
        </div>
        <form onSubmit={this.onSubmit}>
        <div className="p-3 mb-2 bg-secondary text-white">
          <div className="form-group"> 
            <label>Username: </label>
            <input readOnly
                className="form-control"
                value={this.state.username}
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
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
          </div>
        </form>
    </div>
    );
   }
}