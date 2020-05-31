import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Exercise = props => (
  <tr className="p-3 mb-2 bg-light text-dark">
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <button href="#" tabIndex="0" role="link" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</button>
     </td>
  </tr>
)

export default class AboutMe extends Component {
  constructor(props){
    super(props)

  this.onChangeDescription = this.onChangeDescription.bind(this);
  this.onChangeDuration = this.onChangeDuration.bind(this);
  this.onChangeDate = this.onChangeDate.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  this.deleteExercise = this.deleteExercise.bind(this)
  this.exerciseList=this.exerciseList.bind(this)
  this.authRefreshToken=this.authRefreshToken.bind(this)
  this.getExersices=this.getExersices.bind(this)
  this.logout=this.logout.bind(this)
  
  
  this.state={
    newtoken:'',
    name:'',
    id:'',
    description: '',
    duration: 0,
    date: new Date(),
    exercises: []
  }
  }


  componentDidMount() {
    if(localStorage.getItem('token')){

    const token = JSON.parse(localStorage.getItem('token'));
    if(token.message==="auth succesfull"){
      axios.get('http://localhost:5001/user/getIDUsername',{headers: {"authorization" : token.accessToken}})
      .then((res)=>res.data.message ==='fail' ? this.authRefreshToken(token.refreshToken)
      :(this.getExersices(res.data._id),this.setState({id:res.data._id,name:res.data.name})))

  }
    else{
      console.log("fail")
      window.alert('Login first');
      this.props.history.replace('/login');
    }
    }
    else{
    this.props.history.replace('/login');
    window.alert('Login first');
  }
}

authRefreshToken(refreshToken){
  const token = JSON.parse(localStorage.getItem('token'));
  axios.post('http://localhost:5001/user/token',{'refreshToken':refreshToken})
  .then(res => {console.log(res.data)
  token.accessToken=res.data.accessToken
  localStorage.setItem('token', JSON.stringify(token))
   window.location = '/aboutme'})
  .catch(err =>console.log("error + "+ err),window.location='/')
}

getExersices(id){
  axios.get('http://localhost:5000/exercise/'+id)
  .then(response => {
    this.setState({ exercises: response.data })
    //console.log(this.state.exercises)
  })
  .catch((error) => {
    console.log(error);
  })
}

logout() {
  let token = JSON.parse(localStorage.getItem('token'));
  localStorage.removeItem('token');
  axios.delete('http://localhost:5000/user/logout',token.refreshToken)
  .then(res => console.log(res.data)).then(()=>{window.location = '/'})
}
onChangeDescription(e) {
  this.setState({
    description: e.target.value
  })
}

onChangeDuration(e) {
  this.setState({
    duration: e.target.value
  })
}

onChangeDate(date) {
  this.setState({
    date: date
  })
}

exerciseList() {
  return this.state.exercises.map(currentexercise => {
    return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
  })
}

deleteExercise(id) {
  axios.delete('http://localhost:5000/exercise/'+id)
    .then(response => { console.log(response.data)});

  this.setState({
    exercises: this.state.exercises.filter(el => el._id !== id)
  })
}

onSubmit(e) {
  e.preventDefault();

  const exercise = {
    id: this.state.id,
    description: this.state.description,
    duration: this.state.duration,
    date: this.state.date
  }

  console.log(exercise);

  axios.post('http://localhost:5000/exercise/add', exercise)
    .then(res => console.log(res.data));

  window.location = '/aboutme';
}
  render() {
    return (
    <div>
      <button type="button" className="btn btn-outline-light float-right" onClick={this.logout}>Logout</button>
      <div className="p-3 mb-2 bg-secondary text-white">
      <h3>Hello {this.state.name }, Create New Exercise Log</h3>
      </div>
      <form onSubmit={this.onSubmit} >
        <div className="p-3 mb-2 bg-secondary text-white">
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>

        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>

        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise" className="btn btn-primary" />
        </div>
        </div>
      </form>

      <div className="p-3 mb-2 bg-secondary text-white">
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>

   </div>
    );

  }
}