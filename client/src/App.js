import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Container, Card, Row } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        setLectureCode: '',
        setLectureName: '',
        setLecturer: '',
        fetchData: [],
        lectureUpdate: ''
      }
  }
  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value
    this.setState({
      [nam]: val
    })
  }
  handleChange2 = (event) => {
    this.setState({
      codeUpdate: event.target.value,
      lectureUpdate: event.target.value,
      lecturerUpdate: event.target.value
    })
  }

  // step 6  add the respective routes that we defined in the Node.js server API. Axios will help us intercept these requests, so that they can communicate with the back-end.
  componentDidMount() {
    axios.get("/api/get")
      .then ((response) => {
        this.setState({
          fetchData: response.data
        })
      })
  }

  submit = () => {
    axios.post('/api/insert', this.state)
      .then(() => { alert('success post')})
      console.log(this.state);
      document.location.reload();
  }

  delete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Really want to delete?')) {
      axios.delete(`/api/delete/${id}`)
      document.location.reload();
    }
  }

  edit = (id) => {
    axios.put(`/api/update/${id}`, this.state)
    document.location.reload();
  }

  // step 7 adding the necessary input texts and buttons that will handle the necessary states and response data.
  render() {
    let card = this.state.fetchData.map((val, key) => {
      return (
        <React.Fragment>
          <Card style={{ width: '18rem'}} className='m-2'>
            <Card.Body>
              <Card.Title> <input name='codeUpdate' onChange={this.handleChange2} defaultValue={val.lecture_code}></input></Card.Title>
              <Card.Title> <input name='lectureUpdate' onChange={this.handleChange2} defaultValue={val.lecture_name}></input></Card.Title>
              <Card.Title><input name='lecturerUpdate' onChange={this.handleChange2} defaultValue={val.lecture_lecturer}></input></Card.Title>
              <Button className='m-2' onClick={() => { this.edit(val.id)}}>Muuda</Button>
              <Button onClick={() => { this.delete(val.id)}}>Kustuta</Button>
            </Card.Body>
          </Card>
        </React.Fragment>
      )
    })

    return (
      <div className='App'>
        <h1>Tunniplaanilaadne toode</h1>
        <div className='form'>
          <input name='setLectureCode' placeholder='Sisesta ainekood' onChange={this.handleChange}/>
          <input name='setLectureName' placeholder='Sisesta õppeaine' onChange={this.handleChange}/>
          <input name='setLecturer' placeholder='Sisesta õppejõud' onChange={this.handleChange}/>
        </div>
        <Button className='my-2' variant='primary' onClick={this.submit}>Salvesta</Button> <br /><br />
        <Container>
          <Row>
            {card}
          </Row>
        </Container>
      </div> 
    )
  }

}


export default App