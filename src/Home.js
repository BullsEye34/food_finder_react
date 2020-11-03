import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import React from 'react'

const handleBtn = (event) => {
console.log(users["data"])
var mailId=document.getElementById("mail").value;
var password=document.getElementById("password").value;
var i =0;
while(i<users["data"].length){
  if(users["data"][i]["username"]===mailId&&users["data"][i]["pass"]===password){
    alert("Logged in successfully")
    return;
  }
  else{
    alert("Wadafaque")
    return;
  }
  i++
}
};
var users;
var admins;
const requestOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};
fetch('http://localhost:3090/auth', requestOptions)
            .then(response => response.json())
            .then(data => users=data
            );


export default class Home extends React.Component{
  _onClick = (e) => {
    var mailId=document.getElementById("mail").value;
var password=document.getElementById("password").value;
var i =0;
while(i<users["data"].length){
  if(users["data"][i]["username"]===mailId&&users["data"][i]["pass"]===password){
    if(users["data"][i]["approved"]==="n"){
      alert("User not Approved")
    }
    alert("Logged in successfully")
    return;
  }
  else{
    alert("Invalid Login or user not Approved yet")
    e.preventDefault()
    return;
  }
  i++
}
    
}
    
  render(){
    return(
      <header className="App-header">
      <div className="carda">
          <div className="content">
          <Form>
<Form.Group controlId="formBasicEmail">
  <Form.Label>Email address</Form.Label>
  <Form.Control size="lg" type="email" id="mail" placeholder="Enter email" />
  <Form.Text className="text-muted">
    We'll never share your email with anyone else.
  </Form.Text>
</Form.Group>

<Form.Group controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control size="lg" type="password" id="password" placeholder="Password" />
</Form.Group>
<Link to="/result" /* onClick={handleBtn} */onClick={e => this._onClick(e)}>
<Button variant="primary" type="submit">
  Submit
</Button>
                              </Link>

</Form>
          </div>
      </div>
    </header>
  );
  }
}